# flashchat
(learning to fly)

Very alpha-ish chat app.

Relies on: [git@github.com:psyopussy/flashchatSailsApi.git](https://github.com/psyopussy/flashchatSailsApi)

Chat is not even realtime for now, lacks native sails.io.js support.
Crome only for now, needs a compatibilty lib of some sort.



## Running The App

After setting up:   [git@github.com:psyopussy/flashchatSailsApi.git](https://github.com/psyopussy/flashchatSailsApi):

Follow these steps to run the app:

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [jspm](http://jspm.io/) is installed globally. If you need to install it, use the following command:

  ```shell
  npm install -g jspm
  ```
  > **Note:** jspm must be installed globally, but a local version will also be installed to ensure a compatible version is used for the project.

  > **Note:** jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm registry config github` and following the prompts. If you choose to authorize jspm by an access token instead of giving your password (see GitHub `Settings > Personal Access Tokens`), `public_repo` access for the token is required.
4. Install the client-side dependencies with jspm:

  ```shell
  jspm install -y
  ```
  >**Note:** Windows users, if you experience an error of "unknown command unzip" you can solve this problem by doing `npm install -g unzip` and then re-running `jspm install`.
5. To run the app, execute the following command:

  ```shell
  http-server -o -c-1
  ```
6. Browse to [http://127.0.0.1:8080](http://127.0.0.1:8080) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.


