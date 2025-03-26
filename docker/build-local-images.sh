#!/bin/bash

source ../.env

# if you're having stale configuration/environment issues, 
# add the --no-cache argument
# docker compose build --no-cache
docker compose build -f ../compose.yml

docker save -o "./images/$IMAGE_BASE_NAME-frontend.tar" $IMAGE_BASE_NAME-frontend
docker save -o "./images/$IMAGE_BASE_NAME-backend.tar" $IMAGE_BACKEND_NAME-backend