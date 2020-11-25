const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/ecommerce_wallet', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('conectado papa')
        // we're connected!
});



module.exports = { mongoose, db }