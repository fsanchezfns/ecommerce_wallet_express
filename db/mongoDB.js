const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('conectado papa')
        // we're connected!
});