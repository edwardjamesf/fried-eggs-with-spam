# fried-eggs-with-spam
Fried eggs with spam web application

# Building the Backend Docker image
1. Open Docker Desktop and login into Docker Hub
2. In bash/cli, navigate to the `backend` folder
3. Run the following command to build the image: `docker buildx build --no-cache --platform=linux/arm64 --pull -t edwardjamesf/fews-fastapi:latest -t edwardjamesf/fews-fastapi:<tag> .`
  - Change the image version tag to represent the appropriate version (ex: 0.0.0)
4. In bash/cli, navigate to the `frontend` folder
5. Run the following command to build the image: `docker buildx build --no-cache --platform=linux/arm64 --pull -t edwardjamesf/fews-vite-dist:latest -t edwardjamesf/fews-vite-dist:<tag> .`
  - Change the image version tag to represent the appropriate version (ex: 0.0.0)
4. In Docker Desktop, go to Images tab and push the new images to Docker Hub

# Deploying on the target environment
1. If .env file does not exist, then make a copy of .env-sample and enter in your credentials for the DB
2. If .env file does exist, then ensure that the Postgres and PGAdmin credentials are correct
  - TODO: if DB is on the same container, is there a need to protect Postgres and PGAdmin credentials?
3. Connect to the target environment (ex: pi5) and navigate to project folder (ex: ~/git_repos/fried-eggs-with-spam)
4. Run the following commands on the target environment:
  - TODO: this doesn't work quite the way I expected, look into this
```
docker container stop frontend backend
docker compose rm
docker compose pull
docker compose up -d
```
  - `docker container stop <container-name>` will stop the specified containers
  - `docker compose rm` will remove all stopped containers listed in the compose.yml file
  - `docker compose pull` will retrieve the latest versions of the containers in the compose.yml file
  - `docker compose up -d` will start up all containers not already started, `-d` will run in detached mode
5. Ensure that all containers are healthy and running successfully
