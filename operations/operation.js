const mongoose = require('mongoose');;
const Schema = mongoose.Schema;

//schema
const operationSchema = new Schema({

    idWallet: {
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

//pregunta??? hago un VOtoOperation???

module.exports = { createOperation }