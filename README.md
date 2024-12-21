# fried-eggs-with-spam
Fried eggs with spam web application

# Change-log
- Backend
  - 0.0.0
    - Initial stable-ish version
  - 0.1.0
    - Switch off of local database and use Neon postgres database
- Frontend
  - 0.0.0
    - Initial stable-ish-version

# Building the Backend Docker image (Spring Boot)
1. Open Docker Desktop and login into Docker Hub
2. In bash/cli, navigate to the `backend` folder
3. Run the following command to build the image: `docker buildx build --no-cache --platform=linux/arm64 --pull -t edwardjamesf/fews-spring-boot:latest -t edwardjamesf/fews-spring-boot:<tag> .`
  - Change the image version tag to represent the appropriate version (ex: 0.0.0)
4. In Docker Desktop, go to Images tab and push the new images to Docker Hub 

# Building the Frontend Docker image (Vite)
1. Open Docker Desktop and login into Docker Hub
1. In bash/cli, navigate to the `frontend` folder
2. Run the following command to build the image: `docker buildx build --no-cache --platform=linux/arm64 --pull -t edwardjamesf/fews-vite-dist:latest -t edwardjamesf/fews-vite-dist:<tag> .`
  - Change the image version tag to represent the appropriate version (ex: 0.0.0)
3. In Docker Desktop, go to Images tab and push the new images to Docker Hub

# Deploying on the target environment
1. If .env file does not exist, then make a copy of .env-sample and enter in your credentials for the DB
2. If .env file does exist, then ensure that the Postgres and PGAdmin credentials are correct
  - TODO: if DB is on the same container, is there a need to protect Postgres and PGAdmin credentials?
3. Connect to the target environment (ex: pi5)
4. Navigate to project folder (ex: ~/git_repos/fried-eggs-with-spam)
5. Run the following commands on the target environment:
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
