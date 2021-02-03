# Sample Bank

## Architecture

This application is structured as a monorepo, which means that all services (backend and frontend) sit under the same Github repository.

## Requirements

- Node.js 12 or later
- AWS account and awscli installed and configured. If not installed, check [here](https://aws.amazon.com/cli)
- Sentry account
- Docker installed (optional)

- AWS Lambda
- AWS S3
- AWS Api Gateway
- PostgreSQL

## Run

You can run all services with docker-compose
`$ docker-compose up --build`

## Backend

#### Account Manager

Manage your account: get the balance, deposit, withdraw and transfer money.

**Documentation**

You can access the OpenAPI (former Swagger) documentation on `/api/v1/docs`
E.g. if you're running with http://lcoalhost:

**Features**

- Deposit money
- Withdraw money
- Transfer money between accounts
- Get balance for Savings and Checking accounts

**Run**

- Local
  Go to the service folder
  `$ cd backend/account-manager`
  If not installed, install nodemon as a global dependency
  `$ npm i -g nodemon`
  Install dependencies
  `$ npm i`
  Run tests
  `$ npm test`
  Start service
  `$ npm run start-local`

- Production
  Go to the service folder
  `$ cd backend/account-manager`
  Install dependencies
  `$ npm i --only=prod`
  Run tests
  `$ npm test`
  Start service
  `$ npm run start`

- Docker
  Add permission to execute the script
  `$ chmod +x startAccountManagerWithDocker.sh`
  Run the script
  `$ ./startAccountManagerWithDocker`

#### Account Type Simulator

- Simulate which account is cheaper for your needs: Pro or Free

**Features**

#### Branch Finder

**Features**

#### Frontend

**Features**

### License

These files are licensed under the [MIT License](LICENSE)
