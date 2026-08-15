const CheckAdminAuth = async (req, res, next) => {
    try {

    } catch (error) {
        res.status(500).json({ status: 500, flag: false, message: "Internal Server Error!", error });
    }
}


module.exports = {
    CheckAdminAuth
}