## Docker images

build images with the shell command `build.sh`.

I build the images on a more powerful machine and move them over to my lighter webserver

You can either create a a little `build.sh` for yourself or pick apart the commands below
```bash
#!/bin/bash
source .env

# docker compose build 
# if you're having stale configuration/environment issues, add the --no-cache argument
docker compose build --no-cache

docker save -o "./images/$IMAGE_BASE_NAME-frontend.tar" $IMAGE_BASE_NAME-frontend
docker save -o "./images/$IMAGE_BASE_NAME-backend.tar" $IMAGE_BASE_NAME-backend
```