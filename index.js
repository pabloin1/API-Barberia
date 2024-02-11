const Server = require('./src/server/server');
const env = require('dotenv').config();

const app = new Server();

app.listen()