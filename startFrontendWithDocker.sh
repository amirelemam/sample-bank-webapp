#!/bin/sh

IMAGE_NAME="frontend"
CONTAINER_NAME="frontend"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

docker build -t ${IMAGE_NAME} ./frontend
docker run -d -p 3000:3000 --name ${IMAGE_NAME} ${CONTAINER_NAME}

docker logs -f ${CONTAINER_NAME}