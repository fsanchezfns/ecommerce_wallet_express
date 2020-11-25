var express = require('express');
var router = express.Router();
var restController = require('../application/restController')

router.get('/', async function(req, res, next) {
    res = await restController.getWallet(req, res);
});


router.get('/build', async function(req, res, next) {
    res = await restController.buildWalletFull(req, res);
});


module.exports = router;