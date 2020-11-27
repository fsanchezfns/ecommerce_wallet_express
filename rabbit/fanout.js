rabbit = require('./rabbit')


async function rabbitConnect() {
    channel = await rabbit.getChannel();
    //registro

    var exchange = 'auth';

    channel.assertExchange(exchange, 'fanout', {
        durable: false
    });

    //define una cola, sin nombre, pero que escucha los mensajes que tengan como registro auth y fanount
    channel.assertQueue('', {
        exclusive: true
    }, function(error2, q) {
        if (error2) {
            throw error2;
        }

        console.log(`[*] Waiting for messages in exchange: ${exchange}, type: fanout, queue:${q.queue}`);
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

}

module.exports = { rabbitConnect }