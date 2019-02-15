---
layout: project
title: Lionstep - Candidate Search Engine for Recruiting in EU
image: ../../img/lionstep.png
highlighted: true
author: Xanthous
date: 2018-12-18T00:00:00.000Z
draft: false
tags:
  - elasticsearch

meta:
  length: 5 months project
  techstack:
    - elasticsearch
  teammembers:
    - simonliang
    - osmanmesutozcan
---

Client was running into serious performance issues with surfacing hundreds of millions of candidate profiles to their HR clients. They were building their own search solution but the performance was subpar - For searching ~250k profiles the original search time had gone over 2 minutes.

We quickly kicked off a proof-of-concept project with them, showing how we could import the data into Elasticsearch, and perform the same queries within a fraction of a second. The client was happy about the POC and would like to take it to production.

We also saw that the raw data processing had a big issue - the client's data science team who is actively improving the data was having trouble doing iterations on the raw data set of over a hundred million records, which prevents them from surfacing more candidate to their customers.

At the end, we proposed to also set up a fully automated data pipeline to help their data scientists speed up their data processing workflow. We deployed two production-grade Elasticsearch cluster to hold both the raw data and the processed data, with the ease of scheduling cron jobs alongside of the cluster using Kubernetes. We now see a huge improvement of search performance for over 20 million records which can be done within seconds, and also with the improved workflow, the candidate data pool is growing steadily.