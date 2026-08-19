const express = require("express");
const { CheckAdminAuth } = require("../middlewares/adminAuth.middleware");
const { setAdminDataHandler } = require("../handlers/admin.handler");
const ROUTER = express.Router();


ROUTER.route("/check-admin-auth").get(CheckAdminAuth, setAdminDataHandler);


module.exports = ROUTER;