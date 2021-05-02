#!/bin/sh

IMAGE_NAME="account_type_simulator"
CONTAINER_NAME="account_type_simulator"

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

docker build -t ${IMAGE_NAME} ./backend/account-type-simulator 
docker run -d -p 4020:4020 --name ${IMAGE_NAME} ${CONTAINER_NAME}

docker logs -f ${CONTAINER_NAME}