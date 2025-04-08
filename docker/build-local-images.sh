#!/bin/bash

source ../.env.prod

# if you're having stale configuration/environment issues, 
# add the --no-cache argument
# docker compose build --no-cache
# docker compose --file ../compose.yml build

docker compose --env-file ../.env.prod -f ../compose.yml build

docker save -o "./images/$IMAGE_BASE_NAME-web.tar" $IMAGE_BASE_NAME-web
docker save -o "./images/$IMAGE_BASE_NAME-cms.tar" $IMAGE_BASE_NAME-cms