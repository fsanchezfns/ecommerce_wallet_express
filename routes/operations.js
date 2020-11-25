var express = require('express');
var router = express.Router();
var RestController = require('../application/restController')

router.post('/', async function(req, res, next) {
    res = await RestController.createOperation(req, res);
});


router.get('/', async function(req, res, next) {
    res.end(RestController.getOperations(req, res));
});

router.get('/:idOperation', async function(req, res, next) {
    res.end(RestController.getOperation(req, res));
});



module.exports = router;