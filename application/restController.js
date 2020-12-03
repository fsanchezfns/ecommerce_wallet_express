const operation = require('../model/operation');
const wallet = require('../model/wallet');
const token = require('../token/token')

async function createOperation(req, res) {
    try {
        idUser = await security(req);
        //retorna la wallet, si no existe la crea.
        voWallet = await wallet.getWallet(idUser);
        payload = (req.body)
        payload.idWallet = voWallet.id;
        voOperation = await operation.createOperation(payload);
        //construyo la proyección. 
        await wallet.buildWallet(voOperation);
        hlresult(voOperation, res);

    } catch (err) {
        hlError(err, res)
    }
}


async function getOperation(req, res) {
    try {
        idUser = await security(req);
        idOperation = req.params.idOperation;
        voOperation = await operation.getOperation(idOperation);
        hlresult(voOperation, res);

    } catch (err) {
        hlError(err, res)
    }

}


async function getOperations(req, res) {
    try {
        idUser = await security(req);
        voOperationList = await operation.getOperations(idUser);
        hlresult(voOperationList, res);


    } catch (err) {
        hlError(err, res)

    }
}



async function getWallet(req, res) {
    try {
        idUser = await security(req);
        voWallet = await wallet.getWallet(idUser)
        hlresult(voWallet, res)

    } catch (err) {
        hlError(err, res)
    }

}


async function buildWalletFull(req, res) {
    try {
        idUser = await security(req);
        voOperationList = await operation.getOperations(idUser);
        console.log('ya tengo las operaciionesr')
        voWallet = await wallet.buildWalletFull(voOperationList);

        hlresult(voWallet, res)

    } catch (err) {
        hlError(err, res)
    }


}


//HELPER

//format response OK 
function hlresult(result, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result));
    return res;
}

//format Error /*luego realizar un handler error*/
function hlError(err, res) {
    let error = new Object();
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json')
    error.messages = err;
    res.end(JSON.stringify(error))

}



//security  
async function security(req) {
    //obtener el header
    headers = req.headers
    tokenHeader = headers.authorization

    if (tokenHeader == null) { throw ('queonda') };

    tokenAux = tokenHeader.substr(7)

    //validar
    voUser = await token.validate(tokenAux);

    if (voUser == null) {
        throw ('noautorizado');
    } else {

        return JSON.parse(voUser).id;
    }
}


module.exports = { createOperation, getOperation, getOperations, getWallet, buildWalletFull }