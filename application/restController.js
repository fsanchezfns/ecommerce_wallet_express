const operation = require('../operations/operation');
const wallet = require('../wallet/wallet');

async function createOperation(req, res) {
    try {
        idUser = "600613d38e02a9531f34b5afb2";
        //retorna la wallet, si no existe la crea.
        voWallet = await wallet.getWallet(idUser);
        payload = (req.body)
        payload.idWallet = voWallet.id;
        voOperation = await operation.createOperation(payload);
        //construyo la proyección. 
        await wallet.buildWallet(voOperation);
        hlresult(voOperation, res);

    } catch (err) {
        errDsc = JSON.stringify(err)
        res.statusCode = 400
        res.end(errDsc)
    }
}


async function getOperation(req, res) {
    try {
        idOperation = req.params.idOperation;
        voOperation = await operation.getOperation(idOperation);
        hlresult(voOperation, res);

    } catch (err) {
        console.log('mepa que hay error')
        errDsc = JSON.stringify(err)
        res.statusCode = 400
        res.end(errDsc)
    }

}


async function getOperations(req, res) {
    try {
        idWallet = "5fbdd38e02a9531f34b5afb2"
        voOperationList = await operation.getOperations(idWallet);
        hlresult(voOperationList, res);


    } catch (err) {
        console.log('mepa que hay error')
        errDsc = JSON.stringify(err)
        res.statusCode = 400
        res.end(errDsc)

    }
}



async function getWallet(req, res) {
    try {
        idUser = "600613d38e02a9531f34b5afb2";
        voWallet = await wallet.getWallet(idUser)
        hlresult(voWallet, res)

    } catch (err) {
        console.log(err)
    }

}



async function buildWalletFull(req, res) {
    try {
        console.log('estoy en build wallet del controler')
        idWallet = "5fbdd38e02a9531f34b5afb2"
        voOperationList = await operation.getOperations(idWallet);
        console.log('ya tengo las operaciionesr')
        voWallet = await wallet.buildWalletFull(voOperationList);

        hlresult(voWallet, res)

    } catch (error) {

    }


}




//helper
function hlresult(result, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result));
    return res;
}


module.exports = { createOperation, getOperation, getOperations, getWallet, buildWalletFull }