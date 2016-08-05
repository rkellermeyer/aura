#AURA


## Running The App

To run the app, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install


  # set up db
  npm run setup-db

  # start mongo
  # create a new terminal tab
  npm run mongo

  # run and seed the application
  au run --server --seed

  # run and watch codebase
  au run --server --watch
  ```

3. Ensure that [aurelia-cli](https://www.npmjs.com/package/aurelia-cli) is installed globally. If you need to install it, use the following command:

  ```shell
  npm install -g aurelia-cli
  ```


4. To run the app, execute the following command:

  ```shell
  au run
  ```
5. Browse to [http://localhost:9000](http://localhost:9000) to see the app. 

6. To run the app and watch for changes, execute the following command:

  ```shell
  au run --watch
  ```
7. Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.


## Testing The App

1. In order to run the application's tests, execute the following command:

  ```shell
  au test
  # or 
  au test --watch
  ```
