var express = require('express');
var router = express.Router();
var RestController = require('../application/restController')

router.get('/', async function(req, res, next) {
    res.end(RestController.getWallet(req, res));
});




module.exports = router;