const operation = require('../operations/operation')


async function createOperation(req, res) {
    try {
        payload = (req.body)
            //add id wallet
        payload.idWallet = "5fbdd38e02a9531f34b5afb2";

        result = await operation.createOperation(payload);
        hlresult(result, res);

    } catch (err) {
        errDsc = JSON.stringify(err)
        res.statusCode = 400
        res.end(errDsc)
    }
}


function getOperation(req, res) {

    return `get ${req.params.idOperation}`
}


function getOperations(req, res) {

    return "getOperations"
}


function getWallet(req, res) {

    return "getWallet"
}




//helper
function hlresult(result, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result));
    return res;
}


module.exports = { createOperation, getOperation, getOperations, getWallet }