const mongoose = require("mongoose")
const constants = require('../config/constants')
const watchSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        enum: constants.companyOptions,
    },
    model: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
{
    timestamps: true,
}
)
const Watch = mongoose.model("Watches", watchSchema)
module.exports = Watch