// ------------------------------ requireing the packages ------------------------------
const mongoose = require("mongoose");

// ------------------------------ defining the hero schema ------------------------------
const updateLogSchema = new mongoose.Schema({
    section: { type: String, required: [true, "Section name is required"] },
    oldValue: { type: Object, required: [true, "Old value is required"] },
    newValue: { type: Object, required: [true, "New value is required"] },
    status: { type: String, required: [true, "Status is required"] },
    device: { type: Object },

    createdAt: { type: Date, default: Date.now },
});

// ------------------------------ exporting the model ------------------------------
module.exports = mongoose.model("UpdateLogSection", updateLogSchema);
