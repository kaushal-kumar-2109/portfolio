// ------------------------------ requireing the packages ------------------------------
const mongoose = require("mongoose");

// ------------------------------ defining the hero schema ------------------------------
const aboutSchema = new mongoose.Schema({
    sectionTitle: { type: String, default: "About" },
    subtitle: { type: String },
    mainDescription: { type: String },
    extendedBio: { Type: String },
    aboutProfileImage: { type: String },
    birthDay: { type: String },
    city: { type: String },
    email: { type: String },
    website: { type: String },
    phone: { type: String },
    degree: { type: String },
    age: { type: String },
    workStatus: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ------------------------------ exporting the model ------------------------------
module.exports = mongoose.model("AboutSection", aboutSchema);
