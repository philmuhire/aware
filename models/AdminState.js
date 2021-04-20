const mongoose = require("mongoose");

const AdminStateSchema = new mongoose.Schema({ 
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    grantedBy: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "ADMIN",
        enum: ["ADMIN", "SUPER_ADMIN"]
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

 module.exports = mongoose.model("AdminState", AdminStateSchema);