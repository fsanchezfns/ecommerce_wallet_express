var amqp = require('amqplib/callback_api');

amqp.connect('amqp://192.168.99.100', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var exchange = 'operations';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        data = new Object();
        data.idWallet = "5f964059b2c38d058cd5a51e";
        data.type = "extraction";
        data.description = "demo con el profe a el usuario franco";
        data.amount = 500;
        data.idOrder = 1;

        channel.publish(exchange, 'create', Buffer.from(JSON.stringify(data)));

        console.log("send: " + JSON.stringify(data));
    });

});