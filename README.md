# fried-eggs-with-spam
Fried eggs with spam web application

# Building the Backend Docker image
1. Open Docker Desktop and login into Docker Hub
2. In bash/cli, navigate to the `backend` folder
3. Run the following command to build the image: `docker buildx build --no-cache --platform=linux/arm64 --pull -t edwardjamesf/fews-fastapi:latest -t edwardjamesf/fews-fastapi:0.0.0 .`
  - Change the image version tag to represent the appropriate version
4. In Docker Desktop, go to Images tab and push the new images to Docker Hub

# Deploying on the target environment
1. If .env file does not exist, then make a copy of .env-sample and enter in your credentials for the DB
2. If .env file does exist, then ensure that the Postgres and PGAdmin credentials are correct
  - TODO: if DB is on the same container, is there a need to protect Postgres and PGAdmin credentials?
3. Run the following commands on the target environment:
```
docker compose down
docker rm -f
docker pull
docker compose up -d
```
4. Ensure that all containers are healthy and running successfully
