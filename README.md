## Sample Bank

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
- Transfer money between accounts
- Get balance for Savings and Checking accounts

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

### Run

#### Docker

`$ ./startAccountManagerDockerContainer`

- docker build . -t account-manager
- docker run -p 4000:4000 -d account-manager


### License

These files are licensed under the [MIT License](LICENSE)
