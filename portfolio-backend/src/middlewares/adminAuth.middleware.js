const TokenSchema = require("../models/token.model.js");
const AdminSchema = require("../models/admin.model.js");
const { VerifyToken } = require("../utils/token.handler.js");

const CheckAdminAuth = async (req, res, next) => {

    try {
        const { AdminToken } = req.cookies;
        if (!AdminToken) return res.status(401).json({ status: 401, flag: false, message: "Unauthorized! No Admin Token", data: null, error: "No Admin Token Provided" });

        const verifyTokenRes = await VerifyToken(AdminToken);
        if (!verifyTokenRes.status) return res.status(401).json({ status: 401, flag: false, message: "Unauthorized! Invalid Admin Token", data: null, error: verifyTokenRes.error });

        const verifyToken = await TokenSchema.findOne({ token: AdminToken });
        if (!verifyToken) return res.status(401).json({ status: 401, flag: false, message: "Unauthorized! Invalid Admin Token", data: null, error: "Invalid Admin Token" });

        // const currentTime = Math.floor(Date.now() / 1000);
        // if (verifyTokenRes.userPayload.exp < currentTime) {
        //     await TokenSchema.deleteOne({ token: AdminToken });
        //     return res.status(401).json({ status: 401, flag: false, message: "Unauthorized! Invalid Admin Token", data: null, error: "Invalid Admin Token" });
        // }

        const AdminData = await AdminSchema.findById({ _id: verifyTokenRes.userPayload._id });
        if (!AdminData) return res.status(404).json({ status: 404, flag: false, message: "Admin Not Found ", data: null, error: "Admin Not Found" });

        req.adminId = AdminData._id;

        next();
    } catch (error) {
        console.log("Error in the authentication 'CheckAdminAuth' error => ", error);
        res.status(500).json({ status: 500, flag: false, message: "Internal Server Error!", error: error.message, data: null, });
    }

}


module.exports = {
    CheckAdminAuth
}