require("dotenv").config();
const express = require("express");
const cors = require("cors");


// ------------------------------ initializing the app variables ------------------------------
const port = process.env.PORT || 4000;
const version = process.env.VERSION;
const webStatus = process.env.WEB_STATUS;
const backendHostUrl = process.env.BACKEND_HOST_URL;
const app = express();

console.log(webStatus === 'local');

// ------------------------------ middleware ------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [`http://localhost:${port}`, ""],
    credentials: true
}));


// ------------------------------ requiring all routers from routes folder ------------------------------
const getRouter = require("./src/routers/get.router.js");
const postRouter = require("./src/routers/post.router.js");
const putRouter = require("./src/routers/put.router.js");
const deleteRouter = require("./src/routers/delete.router.js");


// ------------------------------ middleware to connect all routers ------------------------------
app.use(`/api/${version}/get`, getRouter);
app.use(`/api/${version}/post`, postRouter);
app.use(`/api/${version}/put`, putRouter);
app.use(`/api/${version}/delete`, deleteRouter);


// ------------------------------ test router ------------------------------
app.get("/", async (req, res) => {
    try {
        res.status(200).json({ status: true, code: 200, message: "The backend server is running successfully" });
    } catch (error) {
        res.status(500).json({ status: false, code: 500, message: error.message, error });
    }
});


// ------------------------------ server listening ------------------------------
app.listen(port, () => {
    console.log(`The backend server is running on the ${port}`);
    console.log(`The backend api version is ${version}\n`);
    console.log((webStatus === "local") ? `The get router on : http://localhost:${port}/api/${version}/get` : `The get router on : ${backendHostUrl}/api/${version}/get`);
    console.log((webStatus === "local") ? `The post router on : http://localhost:${port}/api/${version}/post` : `The post router on : ${backendHostUrl}/api/${version}/post`);
    console.log((webStatus === "local") ? `The put router on : http://localhost:${port}/api/${version}/put` : `The put router on : ${backendHostUrl}/api/${version}/put`);
    console.log((webStatus === "local") ? `The delete router on : http://localhost:${port}/api/${version}/delete` : `The delete router on : ${backendHostUrl}/api/${version}/delete`);
    console.log((webStatus === "local") ? `The main server is http://localhost:${port}` : `The main server is ${backendHostUrl}`);
});