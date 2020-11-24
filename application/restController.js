function createOperation(req, res) {
    body = JSON.stringify(req.body)
    return `body:  ${body}`
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


module.exports = { createOperation, getOperation, getOperations, getWallet }