const mongoose = require("mongoose")
const watchSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        enum: ["Rolex", "Omega", "hublot", "Richard Mille"],
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
const Watches = mongoose.model("Watches", watchSchema)
module.exports = Watches