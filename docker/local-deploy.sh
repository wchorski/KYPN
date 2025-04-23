#!/bin/bash
docker compose --env-file ../.env.prod -f ../compose.local.yml up -d