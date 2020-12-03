const mongoose = require('mongoose');;
const Schema = mongoose.Schema;

//schema
const operationSchema = new Schema({
    idWallet: { // or IdUSER no se como tommarlo
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        enum: ['extraction', 'load'],
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
        required: [true, 'amount es obligatorio']
    },
    idOrder: {
        type: String,
        required: false,
    }
}, { collection: 'operations' });

const Operation = mongoose.model('Operation', operationSchema);


async function createOperation(data) {
    try {

        //si es extraction guardo el numero negativo
        amountAux = data.amount
        if (data.type == 'extraction') {
            amountAux = -amountAux
        } else {
            amountAux = Math.abs(amountAux)
        }

        data.amount = amountAux

        const operation = new Operation({
            idWallet: data.idWallet,
            type: data.type,
            description: data.description,
            amount: data.amount,
            idOrder: data.idOrder
        })

        result = await operation.save();
        return operationToVO(result);

    } catch (err) {
        throw (err);
    }
}

async function getOperation(idOperation) {
    try {
        operation = await Operation.findById(idOperation);
        return operationToVO(operation)
    } catch (err) {
        throw (err);
    }
}


async function getOperations(idWalletAux) {
    try {
        voOperationList = new Array();
        operationList = await Operation.find({ idWallet: idWalletAux }).exec()

        //vario la lista encontrada y lo paso a VO
        for (var index in operationList) {
            voOperation = operationToVO(operationList[index]);
            voOperationList.push(voOperation);
        }

        return voOperationList

    } catch (err) {
        throw (err);
    }

}





function operationToVO(operation) {
    voOperation = new Object();
    voOperation.id = operation._id
    voOperation.idWallet = operation.idWallet
    voOperation.dateTime = operation.dateTime
    voOperation.type = operation.type
    voOperation.description = operation.description
    voOperation.amount = Math.abs(operation.amount)
    voOperation.idOrder = operation.idOrder
    return voOperation;
}



module.exports = { createOperation, getOperation, getOperations }