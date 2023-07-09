const managerSchema = require('../models/managerModel')
exports.createManager = async (req, res) => {
    try {
        const newManager = new managerSchema(req.body);
        await newManager.save();

        res.status(200).json(newManager)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
        console.log(error);
    }
}