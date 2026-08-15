// ------------------------------ requireing the packages ------------------------------
const mongoose = require("mongoose");

// ------------------------------ defining the hero schema ------------------------------
const skillsSchema = new mongoose.Schema({
    skillName: { type: String, required: [true, "Skill name is required"] },
    skillProficiency: { type: String, required: [true, "Skill proficiency is required"] },
    category: {
        type: String,
        required: [true, "Skill category is required"],
        enum: ["programmingLanguages", "frontend", "backend", "database", "tools", "design", "cms", "other"],
        default: "programmingLanguages"
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ------------------------------ exporting the model ------------------------------
module.exports = mongoose.model("SkillsSection", skillsSchema);
