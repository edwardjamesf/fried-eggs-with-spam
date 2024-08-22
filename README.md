# fried-eggs-with-spam
Fried eggs with spam web application

# Building the Docker image
1. Open Docker Desktop and login into Docker Hub
2. In bash/cli, navigate to the `backend` folder
3. Run the following command to build the image: `docker buildx build --no-cache --platform=linux/arm64 --pull -t edwardjamesf/fews-fastapi:latest -t edwardjamesf/fews-fastapi:0.0.0 .`
  - Change the image version tag to represent the appropriate version
4. In Docker Desktop, go to Images tab and push the new images to Docker Hub
