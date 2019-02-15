---
layout: post
title: 'Full-Stack Serverless MVP recipe for cash-trapped Startups.'
author: Necmttn
tags: ['Serverless', 'React', 'mvp']
image: ../img/server.jpg
date: '2015-02-02T23:46:37.121Z'
draft: false
---

> Infinite independence + cost effectiveness + boundless flexibility = Happy Startups Everywhere!

## What is an MVP?

No, we’re not talking about “most valuable player,” though that term could apply. We’re talking about Minimum Viable Product. And your Minimum Viable Product could become your Most Valuable Player, if you do your product road-mapping right.

Developing a new product is an expensive proposition. That’s easy enough to understand. With great cost comes great risk that the return on investment will be too little to justify the product’s development price tag. Cutting back on the features that go into a product is a big part of reducing risk with any new idea. The philosophy of MVP is to cut out everything except the core features an early customer would demand. The product is still valuable, because it allows the customer to solve some problems. So, the product is viable, but only minimally so.

Besides reduced risk, fewer features also mean a shorter runway to product launch. The MVP allows the developers and product owner to get feedback that much sooner. It’s almost like a new dimension of agile, iterative development — extending the development cycle into the marketplace for real-world reaction to the product idea to help the development team know whether or not they’re headed in the right direction. Design and development assumptions are put under the harsh light of public, end-user scrutiny.

Think of MVP as your first mega-sprint in the development cycle.

So what you need for is computing, data storage, hosting, content delivery.. etc. When it's come to Cloud providers I prefer to work with AWS because of their maturity in the field and their free tier.

![freetier.png](https://cdn.filestackcontent.com/lyMpZWSNSwMJgrMZdiMA)

## What is Serverless Architecture?

Serverless doesn’t mean there are no servers! I agree, the term serverless is quite misleading. There are servers definitely, but you don’t have to worry about their scaling, maintenance, etc. Because computing resources are used as service. It can be classified as the third generation application architecture after monolith and microservices.

It is basically a cloud model where you pay only for the time your code is executed on the cloud infrastructure.

In other words, the serverless architecture allows developers to deploy their code in the form of small function packages. The platform on which the code runs is managed by the cloud providers.

These functions are executed in server-side stateless and event-triggered containers which are managed by third-party vendors. These functions are invoked by various external sources, like containers, database, storage, etc.

With the use of products such as AWS Lambda you don’t have to manage service discovery, container instance scaling and container-level logging which was essential in container driven microservice architecture.

This is exceptionally good for developers working in the startup as **they can focus more on deployment part rather than maintenance**.

## Benefits of Serverless Architecture

There's a bunch of articles out there why serverless is awesome instead of telling the same thing over again I would like to give a more big picture for how all this connects each other to make an MVP.

## Setting up an awesome MVP

Most of the MVP requires basic demands to be called MVP. such as a server, storage, auth flow etc.

# Back-end:

### - [AWS AppSync](https://aws.amazon.com/appsync/) for Graphql Server

> Build data-driven apps with real-time and offline capabilities
> Appsync will be going to replace traditional REST API with [Graphql](https://graphql.org/).

**Freebies**
The Free Tier offers the following monthly usage levels at no charge for 12 months after you sign up for an AWS account.
250,000 query or data modification operations
250,000 real-time updates
600,000 connection-minutes

### - [AWS Cognito](https://aws.amazon.com/cognito/) for Auth Flow

> Simple and Secure User Sign-Up, Sign-In, and Access Control

**Freebies**
AWS Cognito charges per MAU(Monthly Active User) and first 50,000 MAU is **free**.

### - [AWS Lambda](https://aws.amazon.com/lambda/) for custom business logic.

> Run code without thinking about servers. Pay only for the compute time you consume.

**Freebies**
The Lambda free tier includes **1M free requests** per month and** 400,000 GB-seconds of computing time** per month.

### - [AWS DynamoDB](https://aws.amazon.com/dynamodb/) for storage.

> Fast and flexible NoSQL database service for any scale

**Freebies**
25 GB per month of data storage
200 million request per month
2.5 million stream requests per month

# Front-end:

### [React](https://github.com/facebook/create-react-app)

> A JavaScript library for building user interfaces

React is the most common UI library out there and has a huge community.

### [Apollo Client](https://www.apollographql.com/docs/react/)

> Apollo Client is the best way to use GraphQL to build client applications.

Which comes with a bunch of goodies such as,

#### - Declarative data fetching

if you have experience with [React-redux](https://react-redux.js.org) you probably have seen ugly ajax request handling in redux actions which looks like.

```
export const FETCH_JOB = "FETCH_JOB";
export function fetchJob(job_name) {
  return function (dispatch) {
    dispatch(fetchingJob(job_name));
    return axios.get(searchApi(`/jobs/${job_name}`)).then(function (response) {
      return dispatch(jobFetched(response.data));
    }).catch(function (error) {
      console.error(error);
      return dispatch(jobFetchFailed(error));
    });
  };
}

export const FETCHING_JOB = 'FETCHING_JOB';
export function fetchingJob(job_name) {
  return {
    type: FETCHING_JOB,
    job_name
  };
}

export const JOB_FETCHED = 'JOB_FETCHED';
export function jobFetched(job) {
  return {
    type: JOB_FETCHED,
    job
  };
}

export const JOB_FETCH_FAILED = 'JOB_FETCH_FAILED';
export function jobFetchFailed(error) {
  return {
    type: JOB_FETCH_FAILED,
    message: "error fetching job"
  };
}
```

with **Apollo-Client** you can able copsulate this logic inside of component.

```
const JobFeed = () => (
  <Query query={GET_JOB}>
    {({ loading, error, data }) => {
      if (error) return <Error />
      if (loading || !data) return <Fetching />;

      return <DogList dogs={data.dogs} />
    }}
  </Query>
)
```

which is more pleasenty to work with.

#### - Zero-config caching

Just by setting up Apollo Client, you get an intelligent cache out of the box with no additional configuration required
.

#### - Combine local & remote data

Thanks to Apollo Client plugin `apollo-link-state` you can handle app state without redux.

```
const GET_JOB = gql`
  query GetJobById($Id: String!) {
    Job(Id: $Id) {
      images {
        url
        id
      }
      isLiked @client
    }
  }
`;
```

and you can get this state which ever component you need in the app.

### [AWS Amplify](https://aws-amplify.github.io/)

> The foundation for your cloud-powered mobile & web apps

AppSync Client with AWS Amplify to simplify user authentication workflows in your application. AppSync provides authentication using API Key, Cognito User Pools or AWS IAM policies and AWS Amplify complements the same with methods provided in Auth Class for user sign-up, sign-in, password confirmation and sign-out.

How you connect to AWS Appsync from front-end.

```
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react/dist/Auth';
import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
const client = new AWSAppSyncClient({
  url: 'https://xxxx.appsync-api.us-east-1.amazonaws.com/graphql',
  region: 'us-east-1',
  auth: {
    // AWS Cognito User Pool
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),

    // API KEY
    type: AUTH_TYPE.API_KEY,
    apiKey: 'xxxxxxxxxxxxx',
    // AWS IAM
    type: AUTH_TYPE.AWS_IAM
    credentials: () => Auth.currentCredentials(),
   },
});
const WithProvider = () => (
  <Router>
    <ApolloProvider client={client}>
  </Router>
);
export default withAuthenticator(WithProvider);
```

as a example of how its combines for login form is as follows;

```
import React from 'react';
import { Button, Icon, message } from 'antd';
import { navigateTo } from 'gatsby-link';
import { Auth, Logger } from 'aws-amplify';
import { LoginForm } from '../../Form'

const logger = new Logger('Auth:Login');

// TODO: This should be a form.
class Login extends React.Component {
  state = { status: 'idle' }

  onSuccess(message) {
    logger.debug('login success', message);
    this.setState({ status: 'success' });
    navigateTo('/dashboard');
  }

  onError(err) {
    logger.error(err);
    message.error(err.message)
    this.setState({ status: 'error' });
  }

  /**
   * Log user in using cognito
   */
  onCognitoLogin = (values) => {
    logger.debug('login start')
    this.setState({ status: 'loading' });

    Auth.signIn(values.email, values.password)
      .then((success) => this.onSuccess(success))
      .catch((err) => this.onError(err));
  }

  render() {
    return <LoginForm
      onSubmit={this.onCognitoLogin}
      centered="true"
      status={this.state.status}
    />
  }
}

export default Login;
```

LoginForm.js

```
import React from 'react';
import { Form, Input, Button, Col, Icon } from 'antd';
import { Logger } from 'aws-amplify';
import { intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';

import * as t from '../../i18n';

const logger = new Logger('Form:Login', 'DEBUG');

const StyledForm = styled(Form)`
  width: 200px;
  margin: auto;

  .login-button {
    width: 100%;
    float: right;
  }

  .ant-form-item {
    margin-bottom: 5px;
  }
`;

class Login extends React.Component {
  state = { confirmDirty: false }

  onSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields((err, values) => {
      if (err) { return; }

      this.props.onSubmit(values);
    });
  }

  render() {
    const { form, centered, initialValues, status } = this.props;
    const { getFieldDecorator } = form;

    return (
      <StyledForm centered={centered} status={status}>
        <Form.Item>
          {
            getFieldDecorator('email')
            (<Input placeholder="Email" placeholder={this.props.intl.formatMessage({
              id: 'signin.placeholder_email'
            })} />)
          }
        </Form.Item>
        <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [
                  {required: true, message: 'Please input your password!'},
                ]
            })(<Input type="password" placeholder={this.props.intl.formatMessage({
              id: 'signin.placeholder_password'
            })} />)
            }
        </Form.Item>
        <Form.Item>
          <Button
            ghost
            className="login-button"
            type={ status === "error" ? "danger" : "primary" }
            onClick={this.onSubmit}
          >{status === "loading" ? <Icon type="loading" /> : t.signin.confirm }</Button>
        </Form.Item>
      </StyledForm>
    );
  }
}


Login.propTypes = {
  intl: intlShape.isRequired
}
export default Form.create()(injectIntl(Login));
```

### [Ant.design](https://ant.design/docs/react/introduce)

> A design system with values of Nature and Determinacy for the better user experience of enterprise applications

Being able to quickly build up UI of the app and making good looking is crucial for MVP products. That's why you don't want wasting time to build commonly used components from the ground to zero. that's why `Antd` UI library gives you quick boost on that.

### [Styled-components](https://www.styled-components.com/)

> Visual primitives for the component age.
> Use the best bits of ES6 and CSS to style your apps without stress

Even we are using `Ant.design` components we still need to get some custom styling to give our MVP some nice touch and feel. For that case styled-components is the nicest way to give a custom lock for components.

![styled.png](https://cdn.filestackcontent.com/8vsFe52SSV63ICGZq2EA)

### [Netlify](https://www.netlify.com/)

> Build, deploy, and manage modern web projects

Netlify comes really handy for MVP deployments. with the quick setup you can add git hooks for auto-build your code and deploy.

Every time you open a pull request, or push new changes to a branch, Netlify automatically builds a preview with a unique URL. Like a staging environment for every PR or branch, previews are perfect for testing and collaboration.

With the tools & libraries listed above with the team of 3 developers we have managed to pull off challenging MVP product [AMZ Kungfu - Amazon Seller Ads Automation Platform](https://www.amzkungfu.com/)  
Which is made of;
**16** DynamoDB tables
**28** Lambda
**6** [AWS SNS](https://aws.amazon.com/sns/) Topic
**4** [AWS SQS](https://aws.amazon.com/sqs/) Queue

- Fully Automated and Reactive Data Pipeline with Serverless via AWS Lambda. More than 500k records are synced into DynamoDB in minutes. Also at an extremely low cost of \$0 for all the computing power.
- Seamless automation that reacts to the data change. As soon as data is updated, we optimize the bidding strategy for the Amazon seller ads.
- Rapid prototyping with AWS AppSync GraphQL and React. Data is synced to the frontend and rendered into graphs to provide insight for the sellers.
  in less than 2 months.
  ![ppc_screenshot_05.png](https://cdn.filestackcontent.com/cSnwY7IfQsuRrkGYqWjo)
  ![ppc_screenshot_06.png](https://cdn.filestackcontent.com/9R17ygquS56wJsGaOSGf)

Stay tuned if you wanna hear in detail how we achieve this.
