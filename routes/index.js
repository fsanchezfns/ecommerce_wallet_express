var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


/**
 * @apiDefine Error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "messages": "description"
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