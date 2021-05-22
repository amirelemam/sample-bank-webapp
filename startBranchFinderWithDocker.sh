#!/bin/sh

IMAGE_NAME="branch_finder"
CONTAINER_NAME="branch_finder"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

ENV_FILE=./backend/branch-finder/.env.production
if [ -f "$ENV_FILE" ]; then
  echo "$ENV_FILE found."
  docker build -t ${IMAGE_NAME} ./backend/branch-finder
  docker run -d -p 4010:4010 --env-file	$ENV_FILE --name ${IMAGE_NAME} ${CONTAINER_NAME}
  
  docker logs -f ${CONTAINER_NAME}
else
  echo "$ENV_FILE file not found. Aborting..."
fi