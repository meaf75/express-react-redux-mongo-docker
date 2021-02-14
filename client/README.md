# Getting Started with Create React App

In this client app you can cosume the Rest API server located in this reposity, it displays the last hacker news ordered by post date from the last hour

## Initialization
- This backend service requires a '.env' file to work in local, you can use the [env.example](./env.example) located in this folder to configurate the service env variables.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`


# Running as docker
### Building docker image
- First of all you need to build the service docker image, you can build the image with the following command passing it respectives arg:

  Command
  ```bash
  docker build -t fullstack-client --build-arg REACT_APP_API_ENDPOINT=$REACT_APP_API_ENDPOINT .
  ```

  Example:
  ```bash
  docker build -t fullstack-client-block --build-arg REACT_APP_API_ENDPOINT=http://localhost:4001 .
  ```

### Running docker
- You can run the docker easyly with the following command:

  Command
  ```bash
  docker run --name=${DOCKER_NAME} -p 0.0.0.0:3001:3000 ${DOCKER_IMAGE_NAME}
  ```

  Example:
  ```bash
  docker run --name="fullstack-client-block" -p 0.0.0.0:3001:3000 fullstack-client
  ```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
