// ------------------------------ requireing the packages ------------------------------
const mongoose = require("mongoose");

// ------------------------------ defining the hero schema ------------------------------
const heroSchema = new mongoose.Schema({
    greeting: { type: String },
    fullName: { type: String },
    typingTitles: { type: String },
    shortDescription: { type: String },
    primaryButtonText: { type: String },
    primaryButtonUrl: { type: String },
    secondaryButtonText: { type: String },
    secondaryButtonUrl: { type: String },
    socialLinks: { type: [Object] },
    heroBackgroundImage: { type: String },
    profileImage: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ------------------------------ exporting the model ------------------------------
module.exports = mongoose.model("HeroSection", heroSchema);
