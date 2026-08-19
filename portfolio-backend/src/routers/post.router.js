const express = require("express");
const { adminLoginHandler } = require("../handlers/admin.handler");
const ROUTER = express.Router();


ROUTER.route("/admin/login").post(adminLoginHandler);


module.exports = ROUTER;