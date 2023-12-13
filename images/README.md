## Docker images

build images with the shell command `build.sh`. 

I build the images on a more powerful machine and move them over to my lighter webserver

```sh
docker save -o "./images/$IMAGE_BACKEND_NAME.tar" $IMAGE_BACKEND_NAME
docker load -i image_name.tar
```