#!/bin/bash

source .env

docker compose build --no-cache
docker save -o "./images/$IMAGE_FRONTEND_NAME.tar" $IMAGE_FRONTEND_NAME
docker save -o "./images/$IMAGE_BACKEND_NAME.tar" $IMAGE_BACKEND_NAME