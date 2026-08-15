// ------------------------------ requireing the packages ------------------------------
const mongoose = require("mongoose");

// ------------------------------ defining the hero schema ------------------------------
const resumeSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Resume title is required"] },
    organisation: { type: String, required: [true, "Organisation name is required"] },
    startDate: { type: String, required: [true, "Start date is required"] },
    endDate: { type: String, required: [true, "End date is required"] },
    description: { type: String, required: [true, "Description is required"] },
    category: { type: String, enum: ["education", "experience"], default: "education" },


    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ------------------------------ exporting the model ------------------------------
module.exports = mongoose.model("ResumeSection", resumeSchema);
