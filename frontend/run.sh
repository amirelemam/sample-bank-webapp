#!/bin/sh
export REACT_APP_PLAN_SIMULATOR_API=$1   
export REACT_APP_ACCOUNT_MANAGER_API=$2   
export REACT_APP_BRANCH_FINDER_API=$3   

# echo "Creating .env file"
echo "REACT_APP_PLAN_SIMULATOR_API=${1}" > .env
echo "REACT_APP_ACCOUNT_MANAGER_API=${2}" > .env
echo "REACT_APP_BRANCH_FINDER_API=${3}" > .env

echo "Building..."
npm run build --production

echo "Running..."
exec serve -s build