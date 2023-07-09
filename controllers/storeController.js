const storeSchema = require('../models/storeModel')
exports.createStore = async (req, res) => {
    try {
        const newStore = new storeSchema(req.body);
        await newStore.save();

        res.status(200).json(newStore)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
        console.log(error);
    }
}