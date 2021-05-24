#!/bin/sh

IMAGE_NAME="frontend"
CONTAINER_NAME="frontend"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

ENV_FILE=./frontend/.env
if [ -f "$ENV_FILE" ]; then
  echo "$ENV_FILE found."
  docker build -t ${IMAGE_NAME} ./frontend
  docker run -d -p 8080:80 --env-file	$ENV_FILE --name ${IMAGE_NAME} ${CONTAINER_NAME}
  
  docker logs -f ${CONTAINER_NAME}
else
  echo "$ENV_FILE file not found. Aborting..."
fi