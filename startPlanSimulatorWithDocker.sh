#!/bin/sh

IMAGE_NAME="plan_simulator"
CONTAINER_NAME="plan_simulator"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

ENV_FILE=./backend/plan-simulator/.env.production
if [ -f "$ENV_FILE" ]; then
  echo "$ENV_FILE found."
  docker build -t ${IMAGE_NAME} ./backend/plan-simulator
  docker run -d -p 4020:4020 --env-file	$ENV_FILE --name ${IMAGE_NAME} ${CONTAINER_NAME}

  docker logs -f ${CONTAINER_NAME}
else
  echo "$ENV_FILE file not found. Aborting..."
fi
