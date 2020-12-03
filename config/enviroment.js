var env = require('node-env-file');
env('./.env');


function getConfig() {
    config = new Object();
    config.serverPort = process.env.SERVER_PORT;
    config.mongoUrl = process.env.MONGO_URL;
    config.rabbitUrl = process.env.RABBIT_URL;
    config.authServiceBaseUrl = process.env.AUTH_BASE_URL;

    return config;
}


module.exports = { getConfig }