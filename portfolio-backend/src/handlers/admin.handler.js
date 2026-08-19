const AdminSchema = require("../models/admin.model.js");
const TokenSchema = require("../models/token.model.js");
const bcrypt = require("bcrypt");
const { CreateToken } = require("../utils/token.handler.js");

const adminLoginHandler = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate request
        if (!username || !password) return res.status(400).json({ status: 400, flag: false, message: "Bad Request!", error: "Please provide username and password!", data: null, });

        // Find admin
        const adminData = await AdminSchema.findOne();
        if (!adminData) return res.status(404).json({ status: 404, flag: false, message: "Admin Not Found!", error: "There is no Admin data created yet!", data: null, });

        // Check username
        const usernameMatch = await bcrypt.compare(username, adminData.userName);
        if (!usernameMatch) return res.status(401).json({ status: 401, flag: false, message: "Invalid credentials UserName!", error: "Unauthorized! Invalid credentials!", data: null, });

        // Check password
        const userPasswordMatch = await bcrypt.compare(password, adminData.password);
        if (!userPasswordMatch) return res.status(401).json({ status: 401, flag: false, message: "Invalid credentials Password!", error: "Unauthorized! Invalid credentials!", data: null, });

        // Create token
        const tokenRes = await CreateToken(adminData);
        if (!tokenRes.status) return res.status(500).json({ status: 500, flag: false, message: "Internal Server Error!", error: tokenRes.error, data: null, });

        // Store token
        await TokenSchema.create({ userId: adminData._id, token: tokenRes.token, });

        // Set cookie
        res.cookie("AdminToken", tokenRes.token, {
            httpOnly: true,
            secure: process.env.WEB_STATUS === "local" ? false : true,
            sameSite: process.env.WEB_STATUS === "local" ? "lax" : "none",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        // Success response
        return res.status(200).json({ status: 200, flag: true, message: "Login successful", data: null, });

    } catch (error) {
        console.error("Admin login error:", error);
        // Prevent another response if one was already sent
        if (res.headersSent) return;
        return res.status(500).json({ status: 500, flag: false, message: "Internal Server Error!", error: error.message, data: null, });
    }
};


const setAdminDataHandler = async (req, res) => {
    try {
        console.log(req.adminId);

        return res.status(200).json({ status: 200, flag: true, message: "Admin Data", data: null, });

    } catch (error) {
        console.error("Admin set data error:", error);
        return res.status(500).json({ status: 500, flag: false, message: "Internal Server Error!", error: error.message, data: null, });
    }
}


module.exports = {
    adminLoginHandler,
    setAdminDataHandler
};