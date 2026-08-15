require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const AdminSchema = require("../src/models/admin.model.js");
const mongo_path = process.env.MONGODB_URL_COMPRESSION || process.env.MONGODB_SRV_URL_COMPRESSION || process.env.MONGODB_URL || process.env.MONGODB_SRV_URL;

const CreateAdminSeed = async () => {

    try {

        console.info("Connecting to the database... ")
        await mongoose.connect(mongo_path);
        console.log("Successfully connected to the MongoDB Database. ✅");

        console.info("Checking for the past admin data...");
        const checkData = await AdminSchema.find();
        if (checkData) console.info(`found ${checkData.length} admin data. 📝 `);
        if (!checkData) console.info("No admin data found. ✅");

        if (checkData) console.info("Clearing the old admin data...");
        if (checkData) await AdminSchema.deleteMany();
        if (checkData) console.info("Admin data cleared successfully! 🧹");

        console.info("Creating the new admin data...");
        console.info("checking for the admin cradentials in env...");
        const planUserName = process.env.ADMIN_USER_NAME;
        const planPassword = process.env.ADMIN_USER_PASS;

        if (!planUserName || !planPassword) {
            console.error("Faild ❌ Admin username or password not found in .env");
            process.exit(1);
        }

        console.info("Admin username and password found in .env ✅");
        console.info("Hashing the admin username and password...");
        const salt = bcrypt.genSaltSync(10);
        const hashUserName = bcrypt.hashSync(planUserName, salt);
        const hashPassword = bcrypt.hashSync(planPassword, salt);
        console.info("Admin username and password hashed successfully! 🔐");

        console.info("Storing the new admin data...");
        const newAdmin = new AdminSchema({
            userName: hashUserName,
            password: hashPassword
        });

        await newAdmin.save();
        console.info("New admin created successfully! ✅");
        process.exit(1);

    } catch (error) {
        console.error("there is an error in creating seed admin => ");
        console.error(error);
        process.exit(1);
    }

}; CreateAdminSeed();