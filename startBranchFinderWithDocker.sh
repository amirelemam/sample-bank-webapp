#!/bin/sh

IMAGE_NAME="branch-finder"
CONTAINER_NAME="branch-finder"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

docker build -t ${IMAGE_NAME} ./backend/branch-finder
docker run -d -p 4010:4010 --name ${IMAGE_NAME} ${CONTAINER_NAME}

docker logs -f ${CONTAINER_NAME}