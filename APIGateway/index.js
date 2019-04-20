const express = require('express'),
    dotenv = require('dotenv'),
    proxy = require('express-http-proxy'),
    utilities = require('./util');

dotenv.config();

const app = express();

/**
 * We can also include some middlewares like authentication and url sanitization, etc.
 */
app.all(
    '/api/communication/*',
    proxy(process.env.COMMUNICATION_API)
)

app.listen(process.env.port);
app.use(utilities.handler.handleError);
process.on('uncaughtException', utilities.handler.handleUncaughtError);
process.on('unhandledRejection', utilities.handler.handleUncaughtError);

app.listen(process.env.PORT);