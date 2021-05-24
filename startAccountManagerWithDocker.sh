#!/bin/sh

IMAGE_NAME="account_manager"
CONTAINER_NAME="account_manager"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

ENV_FILE=./backend/account-manager/.env
if [ -f "$ENV_FILE" ]; then
  echo "$ENV_FILE found."
  docker build -t ${IMAGE_NAME} ./backend/account-manager
  docker run -d -p 4000:4000 --env-file	$ENV_FILE --name ${IMAGE_NAME} ${CONTAINER_NAME}

  docker logs -f ${CONTAINER_NAME}
else
  echo "$ENV_FILE file not found. Aborting..."
fi

