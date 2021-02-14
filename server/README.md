## Initialization
- This backend service requires a '.env' file to work in local, you can use the [env.example](./env.example) located in this folder to configurate the service env variables.

- Make sure you have the mongodb service running in your machine, you can install it with the following guide [Mongodb manual installation](https://docs.mongodb.com/manual/installation/)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Running as docker
### Building docker image
- First of all you need to build the service docker image, you can build the image with the following command passing it respectives arg:

  Command
  ```bash
  docker build -t ${DOCKER_IMAGE_NAME} --build-arg DB_HOST=$DB_HOST --build-arg DB_PORT=$DB_PORT --build-arg DB_NAME=$DB_NAME .
  ```

  Example:
  ```bash
  docker build -t fullstack-backend-block --build-arg DB_HOST=localhost --build-arg DB_PORT=27017 --build-arg DB_NAME=backend-db-block .
  ```

### Running docker
- You can run the docker easyly with the following command:

  Command
  ```bash
  docker run --name=${DOCKER_NAME} -p 0.0.0.0:4001:4000 ${DOCKER_IMAGE_NAME}
  ```

  Example:
  ```bash
  docker run --name="fullstack-backend-block" -p 0.0.0.0:4001:4000 fullstack-backend-block
  ```


## License
[MIT licensed](LICENSE).
