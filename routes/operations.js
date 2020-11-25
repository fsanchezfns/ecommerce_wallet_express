var express = require('express');
var router = express.Router();
var restController = require('../application/restController')

router.post('/', async function(req, res, next) {
    res = await restController.createOperation(req, res);
});


router.get('/', async function(req, res, next) {
    res = await restController.getOperations(req, res);
});

router.get('/:idOperation', async function(req, res, next) {
    res = await restController.getOperation(req, res);
});



module.exports = router;