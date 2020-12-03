const mongoose = require('mongoose');
const cfg = require('../config/enviroment')
config = cfg.getConfig()


mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('conectado a MONGO DB')
        // we're connected!
});



module.exports = { mongoose, db }