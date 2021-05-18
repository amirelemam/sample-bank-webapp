#!/bin/sh

IMAGE_NAME="plan_simulator"
CONTAINER_NAME="plan_simulator"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

docker build -t ${IMAGE_NAME} ./backend/plan-simulator 
docker run -d -p 4020:4020 --name ${IMAGE_NAME} ${CONTAINER_NAME}

docker logs -f ${CONTAINER_NAME}