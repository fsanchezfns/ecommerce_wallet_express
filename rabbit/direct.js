var amqp = require('amqplib/callback_api');
const rabbitController = require('./rabbitController')

async function init() {
    //channel = await rabbit.getChannel();

    //esto lo quise abstraer en rabbit pero no me salio
    amqp.connect('amqp://192.168.99.100', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }


            //registro

            var exchange = 'operations';


            channel.assertExchange(exchange, 'direct', {
                durable: false
            });


            //define la cola 
            channel.assertQueue('', {
                exclusive: true
            }, function(error2, q) {

                if (error2) {
                    throw error2;
                }

                console.log(`[*] Waiting for messages in exchange: ${exchange}, type: direct, queue:${q.queue}, condition: create`);

                //binding , la cola que cree + el exchange operations + la condición create
                channel.bindQueue(q.queue, exchange, 'create');

                channel.consume(q.queue, function(msg) {
                    console.log("Tengo que crear una operación");
                    rabbitController.createOperation(msg.content.toString())
                }, {
                    noAck: true
                });
            });
        });
    });

}


module.exports = { init };