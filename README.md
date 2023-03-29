# SyncFrame

SyncFrame is a simple web application that displays photos with captions in real time. The photos are sent to the application through a Telegram bot, which allows anyone to send photos to the application from their phone.

## Getting started

To get started with SyncFrame, you will need to follow these steps:

1. Clone this repository to your local machine.
2. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).
3. Run `npm install` to install the dependencies.
4. Create a Telegram bot and get its API token. You can do this by following the instructions [here](https://core.telegram.org/bots#6-botfather).
5. Run `export BOT_TOKEN=<your_bot_token>` to set your bot token as an environment variable.
6. Run `export GLOBAL_PASSWORD=<your_global_password>` to set your global password as an environment variable. This password will be used to authenticate users who want to send photos to the bot.
7. Run `npm start` to start the server.

Once you have started the server, you should be able to view the SyncFrame website by navigating to `http://localhost:3000` in your web browser.


## Deploying with Docker

SyncFrame can also be deployed using Docker. To do this, follow these steps:

1. Install [Docker](https://www.docker.com/).
2. Clone this repository to your local machine.
3. Navigate to the root directory of the repository.
4. Build the Docker image by running `docker build -t syncframe .`.
5. Start a container from the image by running `docker run -p 3000:3000 -e BOT_TOKEN=<your_bot_token> -e GLOBAL_PASSWORD=<your_global_password> syncframe`.
6. Once the container is running, you should be able to view the SyncFrame website by navigating to `http://localhost:3000` in your web browser.

## Usage

To use SyncFrame, follow these steps:

1. Send a photo to your Telegram bot, if it is the first time, you need to enter the password as a text message.
2. The photo will be displayed on the LoveFrame website in real time, along with its caption.

## License

This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more information.
