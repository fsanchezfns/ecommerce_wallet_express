var express = require('express');
var router = express.Router();
var restController = require('../application/restController')

/**
 * @api {get} /wallet Get wallet
 * @apiName Get Wallet
 * @apiGroup Wallet
 * @apiDescription Consulta de wallet
 * 
 * @apiUse HeaderAuth
 *
 * @apiUse voWallet
 * 
 * @apiUse Error
 */
router.get('/', async function(req, res, next) {
    res = await restController.getWallet(req, res);
});


/**
 * @api {get} /wallet/build Build wallet
 * @apiName Build Wallet
 * @apiGroup Wallet
 * @apiDescription Reconstruye la wallet
 * @apiUse HeaderAuth
 * 
 * @apiUse voWallet
 * 
 * @apiUse Error
 */

router.get('/build', async function(req, res, next) {
    res = await restController.buildWalletFull(req, res);
});


/**
 * @apiDefine voWallet
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *     "id": "5f964059b2c38d058cd5a51e",
 *     "amount": 5600,
 *     "dateTimeLastUpdate": "2020-12-03T04:20:41.971Z"
 * }
 */


module.exports = router;