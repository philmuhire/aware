const mongoose = require("mongoose");

const UserStateSchema = new mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    grantedBy: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    
    state: {
        type: String,
        enum: ["CREATED", "APPROVED", "SUSPENDED"]
    },
    grantedOn: {
        type: Date,
        default: Date.now
    }
 });

 module.exports = mongoose.model("UserState", UserStateSchema);