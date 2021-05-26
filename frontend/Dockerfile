FROM node:14.17.0-alpine3.11 AS build

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g serve

RUN chmod +x /app/run.sh
ENTRYPOINT /app/run.sh $REACT_APP_PLAN_SIMULATOR_API $REACT_APP_ACCOUNT_MANAGER_API $REACT_APP_BRANCH_FINDER_API