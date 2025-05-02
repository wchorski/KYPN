#!/bin/bash

source ../.env.prod

docker compose --env-file ../.env.prod  down 

docker load -i "./images/$IMAGE_BASE_NAME-web.tar"
docker load -i "./images/$IMAGE_BASE_NAME-cms.tar"

docker compose --env-file ../.env.prod  up -d --remove-orphans