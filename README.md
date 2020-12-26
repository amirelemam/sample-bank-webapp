## Serverless Bank WebApp

### Motivation

### Architecture

- AWS Lambda
- AWS S3
- AWS Api Gateway
- Sentry
- ElephantJS (PostgreSQL)
- Serverless Framework

### Services

**Account Manager**
Features:

- Deposit money
- Withdraw money
- Get balance

**Account Type Simulator**
Features:

- Simulate which account is cheaper for your needs: Pro or Free

**Branch Finder**
Features:

- **Frontend**
  Features:

-

### Documentation

You can access the OpenAPI (former Swagger) documentation [here]()

### Requirments

- AWS account
- aws-cli
- Node.js v12 or later
- Sentry account
- ElephantJS or local posgresql

### Run locally

#### Serverless Framework

`$ git clone https://github.com/amirelemam/`
`$ cd serverless-bank-app`
`$ npm install`
`$ sls offline`

#### Dcoker

`$ ./startDocker`

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
