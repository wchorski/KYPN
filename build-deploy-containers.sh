#!/bin/bash

docker compose --env-file .env.prod  build
docker compose --env-file .env.prod  up -d --remove-orphans