# Sample Bank

Sample Bank allows you to manage your account, choose the cheaper account plan based on your needs and find the nearest branch from your location.  

## Services

- Account Manager: Transfer and get balance of Savings and Checking accounts  
- Plan Simulator: Check the cheapest plan based on your needs  
- Branch Finder: Find the nearest branch to your location  
- Frontend: Application interface  

## Architecture

This application is structured as a monorepo, which means that all services (backend and frontend) sit under the same repository.
<img src="./architecture-diagram/sample_bank_architecture.png" alt="Architecure Diagram" />

## Live Demo

Credentials:  
Branch: 0001   
Account number: 12345   
Password: Qwerty@123  

[Access Live Demo](http://amirelemam.com.s3-website-us-east-1.amazonaws.com/)  

## Requirements

- Node.js 12 or later  
- PostgreSQL 12 or later  
- MongoDB 4.2 or later  
- Google Maps API key  
- Docker (optional)

## Run

You can run all services with docker-compose  
`$ docker-compose up --build`

## Backend

### Account Manager

**Features**  
- Transfer money between accounts  
- Get balance for Savings and Checking accounts  

**Stack**
- Node.js
- Jest
- PostgreSQL

**External Services**
- PostgreSQL

**Environment Variables**
- DB_HOST: Postgres host
- DB_USER: Postgres user
- DB_PASSWORD: Postgres password
- DB_NAME: Postgres DB name
- SECRET_TOKEN: Secret used to create JWT tokens

**Docs**

[Live OpenAPI (former Swagger)](`https://amirelemam.com/samplebank/account-manager/api/docs`)   
Postman collection on `account-manager/src/docs/postman.json`  

**Run**

- Docker (recommended)  
  Make sure you have the file `.env.production` with the environment variables  
  `$ test -e ./backend/account-manager/.env.production && echo file exists || echo file not found`  
  Add permission to execute the script  
  `$ chmod +x startAccountManagerWithDocker.sh`  
  Run the script  
  `$ ./startAccountManagerWithDocker`

- Local  
  Go to the service folder  
  `$ cd backend/account-manager`  
  Install dependencies  
  `$ npm install`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm run start:local`

- Production  
  Go to the service folder  
  `$ cd backend/account-manager`  
  Install dependencies  
  `$ npm install --only=prod`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm start`

### Plan Simulator

**Features**  
- Simulate which plan is cheaper for your needs: Basic or Pro
- Get pricing for all plans

**Stack**
- Node.js
- Jest
- PostgreSQL

**External Services**
- PostgreSQL

**Environment Variables**
- DB_HOST: Postgres host
- DB_USER: Postgres user
- DB_PASSWORD: Postgres password
- DB_NAME: Postgres DB name

**Docs**

[Live OpenAPI (former Swagger)](`https://amirelemam.com/samplebank/plan-simulator/api/docs`)   
Postman collection on `plan-simulator/src/docs/postman.json`  

**Run**

- Docker (recommended)   
  Make sure you have the file `.env.production` with the environment variables  
  `$ test -e ./backend/plan-simulator/.env.production && echo file exists || echo file not found`  
  Add permission to execute the script  
  `$ chmod +x startPlanSimulatorWithDocker.sh`  
  Run the script  
  `$ ./startPlanSimulatorWithDocker`

- Local  
  Go to the service folder  
  `$ cd backend/plan-simulator`  
  Install dependencies  
  `$ npm install`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm run start:local`

- Production  
  Go to the service folder  
  `$ cd backend/plan-simulator`  
  Install dependencies  
  `$ npm install --only=prod`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm start`

### Branch Finder

**Stack**
- Typescript
- Jest
- MongoDB

**External Services**
- MongoDB
- Google Maps API

**Features**  
- Find the nearest branch to the given location (latitude, longitude).  

**Environment Variables**
- DB_CONN_STR: MongoDB connection string

**Docs**

[Live OpenAPI (former Swagger)](`https://amirelemam.com/samplebank/branch-finder/api/docs`)   
Postman collection on `branch-finder/src/docs/postman.json`  

**Run**

- Docker (recommended)  
  Make sure you have the file `.env.production` with the environment variables  
  `$ test -e ./backend/branch-finder/.env.production && echo file exists || echo file not found`  
  Add permission to execute the script  
  `$ chmod +x startBranchFinderWithDocker.sh`  
  Run the script  
  `$ ./startBranchFinderWithDocker`

- Local  
  Go to the service folder  
  `$ cd backend/branch-finder`  
  Install dependencies  
  `$ npm install`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm run start:local`

- Production  
  Go to the service folder  
  `$ cd backend/branch-finder`  
  Install dependencies  
  `$ npm install --only=prod`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm start`


## Frontend

**Stack**
- React.js
- Material UI

**Environment Variables**
- ACCOUNT_MANAGER_API: Account Manager backend URL
- ACCOUNT_TYPE_SIMULATOR_API: Account Type Simulator backend URL
- BRANCH_FINDER_API: Branch Finder backend URL
- Google Maps key (on index.html)

**Requirements**

- [Generate Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Enable Places API](https://console.cloud.google.com/marketplace/product/google/places-backend.googleapis.com)
- [Enable Geocoding API](https://console.cloud.google.com/marketplace/product/google/geocoding-backend.googleapis.com)

**Run**

Before running, you need to change the Google Maps API Key on `frontend/public/index.html`  

- Docker (recommended)  
  Make sure you have the file `.env.production` with the environment variables  
  `$ test -e ./fronend/.env.production && echo file exists || echo file not found`  
  Add permission to execute the script  
  `$ chmod +x startFrontendWithDocker.sh`  
  Run the script  
  `$ ./startFrontendWithDocker`

- Local  
  Go to the service folder  
  `$ cd frontend`  
  Install dependencies  
  `$ npm install`  
  Run tests  
  `$ npm test`  
  Start service  
  `$ npm run start:local`

### Generate Architecture Diagram

The architecture diagram was generated using Python's lib [Diagram](https://diagrams.mingrammer.com/).  

**Requirements**

- Python 3.7 or later  
- Graphviz  
For MacOS: `$ brew install graphviz`  
For another, OS check [the installation info](https://graphviz.org/download/#mac)  

**Install**  
- Install dependencies  
`$ pip install -r requirements.txt`  

**Run**  
- Generate diagram  
`$ python architecure-diagram.py`  

The file will be saved to the current working directory.  

## License

These files are licensed under the [MIT License](LICENSE)
