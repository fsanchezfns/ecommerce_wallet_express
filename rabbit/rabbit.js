var amqp = require('amqplib/callback_api');


/*Tome como punto de partiad este repo */
//https://github.com/alfredobs97/RabbitMQ/blob/master/src/rabbit.js

async function getChannel() {
    try {
        const server = await createConnection('amqp://192.168.99.100');
        const channel = await createChannel(server);
        return channel
    } catch (err) {
        console.log(err);
        throw (err)
    }

}


function createConnection(connectionString) {
    return new Promise((resolve, reject) => {
        amqp.connect(connectionString, function(error0, connection) {
            if (error0) reject(error0);
            resolve(connection);
        });
    });
}

function createChannel(connection) {
    return new Promise((resolve, reject) => {
        connection.createChannel(function(error1, channel) {
            if (error1) reject(error1);
            resolve(channel);
        });
    });
}


module.exports = { getChannel }