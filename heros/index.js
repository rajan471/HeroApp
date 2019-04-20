const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    utilities = require('./util');
require('dotenv').config({ path: './config/.env' });

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
const app = express();

// // create application/x-www-form-urlencoded parser
// app.use(bodyParser.urlencoded({ extended: false }));
// // Supports application/json
// app.use(bodyParser.json());



require('./routes')(app);


app.use(utilities.handler.handleError);
process.on('uncaughtException', utilities.handler.handleUncaughtError);
process.on('unhandledRejection', utilities.handler.handleUncaughtError);

app.listen(process.env.PORT);