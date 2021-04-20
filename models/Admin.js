const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "ADMIN",
        enum: ["ADMIN", "SUPER_ADMIN"]
    },
    state: {
        type: String,
        default: "CREATED",
        enum: ["CREATED", "APPROVED", "SUSPENDED"]
    }
});

module.exports = mongoose.model("Admin", AdminSchema)