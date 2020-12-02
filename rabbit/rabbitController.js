const token = require('../token/token')
const operation = require('../operations/operation');

async function invalidateToken(msg) {
    tokenstr = JSON.parse(msg).message
    if (tokenstr == undefined) {
        console.log('error en el message')
        return 'error';
    } else {
        tokenAux = tokenstr.substr(7)
        await token.invalidateSession(tokenAux)
        return 'ok';
    }
}


async function createOperation(msg) {
    //console.log('messageee:' + msg)
    data = msg
    console.log('data:' + data)
    if (data == undefined) {
        console.log('error en la data');
        return 'error';
    } else {
        voOperation = await operation.createOperation(data)

        return ('create: ' + voOperation);
    }

}


module.exports = { invalidateToken, createOperation }