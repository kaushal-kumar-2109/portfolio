// ------------------------------ requireing the packages ------------------------------
const mongoose = require("mongoose");

// ------------------------------ defining the hero schema ------------------------------
const adminSchema = new mongoose.Schema({
    userName: { type: String, required: [true, "Username is required"] },
    password: { type: String, required: [true, "Password is required"] },
    status: { type: Boolean, default: true },
    lockTill: { type: Date, default: null },
    loginAttempts: { type: Number, default: 3 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ------------------------------ exporting the model ------------------------------
module.exports = mongoose.model("AdminSchema", adminSchema);
