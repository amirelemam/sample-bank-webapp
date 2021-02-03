#!/bin/sh

IMAGE_NAME="account-manager"
CONTAINER_NAME="account-manager"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

docker build -t ${IMAGE_NAME} ./backend/account-manager 
docker run -d -p 4000:4000 --name ${IMAGE_NAME} ${CONTAINER_NAME}

docker logs -f ${CONTAINER_NAME}