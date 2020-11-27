var amqp = require('amqplib/callback_api');

const token = require('../token/token');

function rabbitConnect() {
    amqp.connect('amqp://192.168.99.100', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            //registro
            var exchange = 'auth';

            channel.assertExchange(exchange, 'fanout', {
                durable: false
            });

            //define una cola, sin nombre pero que escucha los mensajes que tengan como registro auth y fanount
            channel.assertQueue('', {
                exclusive: true
            }, function(error2, q) {


                if (error2) {
                    throw error2;
                }
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                //biding 
                channel.bindQueue(q.queue, exchange, '');

                channel.consume(q.queue, function(msg) {
                    if (msg.content) {
                        console.log(" [x] %s", msg.content.toString());
                        console.log("Tengo que desloguear el usaurio")
                            //token.invalidateSession()
                    }
                }, {
                    noAck: true
                });
            });
        });
    });

}

module.exports = { rabbitConnect }