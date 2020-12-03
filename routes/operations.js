var express = require('express');
var router = express.Router();
var restController = require('../application/restController')

/**
 * @api {post} /operations Create Operation
 * @apiName Post Operations
 * @apiGroup Operations
 * @apiDescription Crea una operación
 * @apiExample body
 * 
 *  {
 *   "type": "extraction",
 *   "description": "segunda extración de melisa",
 *   "amount": 5000,
 *   "idOrder": null
 *  }
 * 
 * @apiUse HeaderAuth 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *    "id": "5fc95e3ee6884c33089acf9f",
 *   "idWallet": "5f964059b2c38d058cd5a51e",
 *   "dateTime": "2020-12-03T21:49:58.267Z",
 *   "type": "extraction",
 *   "description": "segunda extración de melisa",
 *   "amount": 5000,
 *   "idOrder": null
 *   }
 * 
 * @apiUse Error
 */
router.post('/', async function(req, res, next) {
    res = await restController.createOperation(req, res);
});

/**
 * @api {get} /operations Get Operations
 * @apiName Get Operations
 * @apiGroup Operations
 * @apiUse HeaderAuth
 * @apiDescription Consulta las operaciones 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   [{
 *    "id": "5fc95e3ee6884c33089acf9f",
 *   "idWallet": "5f964059b2c38d058cd5a51e",
 *   "dateTime": "2020-12-03T21:49:58.267Z",
 *   "type": "extraction",
 *   "description": "segunda extración de melisa",
 *   "amount": 5000,
 *   "idOrder": null
 *   }]
 * 
 *
 * @apiUse Error
 */
router.get('/', async function(req, res, next) {
    res = await restController.getOperations(req, res);
});


/**
 * @api {get} /operation/:id Get Operation
 * @apiName Get Operation
 * @apiGroup Operations
 * @apiDescription Consulta las operaciones 
 * @apiUse HeaderAuth
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *    "id": "5fc95e3ee6884c33089acf9f",
 *   "idWallet": "5f964059b2c38d058cd5a51e",
 *   "dateTime": "2020-12-03T21:49:58.267Z",
 *   "type": "extraction",
 *   "description": "segunda extración de melisa",
 *   "amount": 5000,
 *   "idOrder": null
 *   }
 * 
 *
 *
 * @apiUse Error
 */
router.get('/:idOperation', async function(req, res, next) {
    res = await restController.getOperation(req, res);
});




/**
 * @apiDefine Error
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "messages": "UserNotFound"
 *     }
 */


/**
 * @apiDefine HeaderAuth
 * 
 * @apiExample HeaderAuthorization
 * 
 *  Authorization = Bearer {token}
 */

module.exports = router;