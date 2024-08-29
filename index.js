require('dotenv').config()

const cors = require('cors');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const createApis = require('./api');
const createSocket = require('./socket');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
createApis(app)
createSocket(server)

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
