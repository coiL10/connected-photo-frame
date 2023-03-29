const express = require('express');
const { Telegraf } = require('telegraf');
const http = require('http');
const socketIO = require('socket.io');
const bcrypt = require('bcrypt');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let globalPassword = process.env.GLOBAL_PASSWORD;
let authenticatedUsers = {};

// Generate a hash of the global password using bcrypt
const saltRounds = 10;
const passwordHash = bcrypt.hashSync(globalPassword, saltRounds);

const bot = new Telegraf(process.env.BOT_TOKEN);

//bot.start((ctx) => ctx.reply('Hello! Send me an image and the password, separated by a space, and I will display it on the website.'));

bot.on('message', async (ctx) => {
  if (ctx.message.photo) {
    const user = ctx.from.id;
    if (!authenticatedUsers[user]) {
      ctx.reply('Please enter the password first.');
      return;
    }
    const photo = ctx.message.photo[ctx.message.photo.length - 1];
    const fileId = photo.file_id;
    const file = await bot.telegram.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
    const message = ctx.message.caption || '';
    io.emit('newPhoto', { photo: fileUrl, message: message });
    console.log(message)
    ctx.reply('Photo received!');
  } else if (ctx.message.text) {
    const user = ctx.from.id;
    const password = ctx.message.text;
    console.log(`user: ${user}, password: ${password}`);
    const authenticated = await authenticateUser(user, password);
    if (authenticated) {
      authenticatedUsers[user] = true;
      ctx.reply('Password accepted. You can now send photos.');
    } else {
      ctx.reply('Invalid password. Please try again.');
    }
  }
});
async function authenticateUser(user, password) {
  // Check if the user is already authenticated
  if (authenticatedUsers[user]) {
    return true;
  }

  // Verify the password
  const authenticated = await bcrypt.compare(password, passwordHash);
  if (authenticated) {
    authenticatedUsers[user] = true;
    // Store the user's authentication status in the database
    // TODO
  }
  return authenticated;
}

bot.launch();

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

app.use(express.static('public'));
