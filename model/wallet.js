const mongoose = require('mongoose');;
const Schema = mongoose.Schema;

//schema
const walletSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    dateTimeLastUpdate: {
        type: Date,
        default: Date.now()
    },

}, { collection: 'wallets' });

const Wallet = mongoose.model('Wallet', walletSchema);


async function createWallet(idUserAux) {
    try {
        const wallet = new Wallet({
            idUser: idUserAux,
            amount: 0
        })

        result = await wallet.save();
        return result;

    } catch (err) {
        throw (err);
    }
}


async function getWallet(idUserAux) {
    try {
        wallet = await Wallet.findOne({ idUser: idUserAux }).exec()

        if (wallet == null) {
            wallet = await createWallet(idUserAux)
        }

        return walletToVO(wallet);;

    } catch (err) {
        throw (err);

    }

}


async function buildWallet(voOperation) {
    try {
        console.log('estoy en build wallet')

        amount = voOperation.amount
        if (voOperation.type == 'extraction') {
            amount = -amount
        } else {
            amount = Math.abs(amount)
        }

        idWallet = voOperation.idWallet

        wallet = await Wallet.findOne({ idUser: idWallet }).exec();
        wallet.amount = wallet.amount + amount;

        result = await wallet.save();

        return walletToVO(result);

    } catch (err) {
        throw (err)
    }
}



async function buildWalletFull(voOperationList) {
    try {
        var amountSum = 0
        for (var index in voOperationList) {
            amountSum += voOperationList[index].amount;
        }


        idWallet = voOperationList[0].idWallet;

        wallet = await Wallet.findOne({ idUser: idWallet }).exec();
        wallet.amount = amountSum;
        result = await wallet.save()

        return walletToVO(result);

    } catch (err) {
        throw (err)
    }
}





function walletToVO(wallet) {
    voWallet = new Object();
    voWallet.id = wallet.idUser
    voWallet.amount = wallet.amount
    voWallet.dateTimeLastUpdate = wallet.dateTimeLastUpdate
    return voWallet;
}



module.exports = { getWallet, buildWallet, buildWalletFull }