#!/bin/bash

source ../.env.prod

docker load -i "./images/$IMAGE_BASE_NAME-web.tar"
docker load -i "./images/$IMAGE_BASE_NAME-cms.tar"

docker compose --env-file ../.env.prod  up -d