const token = require('../token/token')
const operation = require('../operations/operation');

async function invalidateToken(msg) {
    try {
        tokenstr = JSON.parse(msg).message
        if (tokenstr == undefined) {
            console.log('error en el message')
            return 'error';
        } else {
            tokenAux = tokenstr.substr(7)
            await token.invalidateSession(tokenAux)
            return 'ok';
        }

    } catch (err) {
        console.log(err);
    }

}


async function createOperation(msg) {

    try {

        data = JSON.parse(msg)

        if (data == undefined) {
            console.log('error en la data');

        } else {

            voOperation = await operation.createOperation(data)
            console.log('Operation create: ' + JSON.stringify(voOperation));
        }

        return; //no se si tengo que retornar algo, me parece que con eso alcanza

    } catch (err) {
        console.log(err)
    }




}


module.exports = { invalidateToken, createOperation }