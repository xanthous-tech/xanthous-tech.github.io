---
layout: post
title: "How to Build a Scalable Data Pipeline with AWS Batch"
author: simonliang
tags: ["AWS"]
image: ../img/computer.jpg
date: "2015-02-02T23:46:37.121Z"
draft: false
---

We helped a client build a job board earlier this year, and in order to make the client’s job sources discoverable on the job board site, we needed to process an industry-standard formatted XML and index them into a search engine (think Elasticsearch).

We had gone through several iterations of the pipeline setup this past year. But there had always been 3 major steps for processing these XML feeds.

1. Download the feed into S3;
2. Parse/process each job post in the feed;
3. Index each job post into the search engine.

The first version of the Feed Consumer was straightforward, we used AWS Lambda to periodically download the feed, and sent the S3 location of the XML into AWS SQS. We combined step 2 and 3 into a single server process and at the end, we used a Java StAX (Streaming API for XML) based queue consumer (written using Spring’s Reactor) to consume each XML and index every single job post into the search engine. It worked well until we started to hit the limit on multiple places:

1. Some of the feeds were simply too large to finish downloading within 5 minutes, the AWS Lambda execution time limit. We couldn’t fix the upstream at the time to have the large feed gzipped. Had to take in whatever we had.
2. When the large XML feeds were being extrapolated and processed in the Java process, it was eating up too much memory. At one point I deployed the process on a 16GB instance and it was still crashing due to OOM.
3. The indexing process took very long to finish — We used Google’s Talent Solutions API to have smarter search results, but each update call took ~2s at the time, and we had a rate limit to comply (@ ~50 QPS, in a 100-second window). To process an entire feed of ~500k jobs, it would take hours to finish.

In order to control the memory issue, we needed to be able to process one feed at a time, instead of having a stream that was piling up the XML feeds in the memory. We needed to split up the extrapolation process and the indexing process into 2 separate stages. However, the extrapolation process could not be done within 5 minutes, so Lambdas are out. We needed a mechanism that can respond to the completion of the download, and put every parsed job post into SQS for the indexing process to chew through.

After scrolling through a bunch of options, AWS Batch seems to be the best option. AWS Batch is essentially a managed ECS (Elastic Container Service) cluster with a task queue. When a task is submitted into the queue, it will start an ECS instance with just enough CPU and RAM to run the tasks that are currently in the queue. With this mechanism, we could have a much clearer division of the steps inside individual processes, and have both the download and extrapolation run as tasks in the Batch queue. We just needed to figure out how to schedule the download tasks into the queue, and then chain the download tasks with the extrapolation tasks.

Luckily, AWS Batch has APIs that can submit a task into a queue. It became very clear that we could just use AWS Lambda to do the task submission. When the download tasks were done, we had them fire an AWS SNS notification to not only indicate that the task was done but also include all the necessary metadata for the extrapolation task to run. Another Lambda function is subscribed to the SNS Topic and submits the extrapolation task into the Batch queue with metadata as environment variables.

At the end of the pipeline, we had the extrapolation tasks put individual job post entities into an SQS queue for a long-running indexing process to pick up and index at the given rate limit. Since the size of individual job posts are much more manageable and the rate limit helped define how much memory we need for the indexing process very well.

With the new version of the pipeline, we could effectively handle XML feeds of any size, since there isn’t an execution time limit with Batch tasks anymore; the extrapolation tasks were blazing fast — for ~500k jobs it only took about 30 minutes to finish; we had the indexing process run inside 8GB of RAM on ECS. Most importantly, with this setup, we saved the client ~40% of AWS hosting cost compared to the previous version. Now the pipeline is processing about 1.5 million jobs per hour, and we were able to serve the best and the freshest content to the job seekers.

At Xanthous Tech, we help data-driven companies to scale and take their business to the next stage. Please feel free to drop us a line at [hi@x-tech.io](mailto:hi@x-tech.io) and we are always happy to help.