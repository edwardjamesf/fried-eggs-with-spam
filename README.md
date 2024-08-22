# fried-eggs-with-spam
Fried eggs with spam web application

# Building the Docker image
1. Change directory to the `backend` folder
2. Run the following command to build the image

```docker buildx build --no-cache --platform=linux/arm64 --pull -t edwardjamesf/fews-fastapi:latest -t edwardjamesf/fews-fastapi:0.0.0 .```
