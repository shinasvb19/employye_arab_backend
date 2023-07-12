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
exports.getStore = async (req, res) => {
    try {
        const getStore = await storeSchema.findOne({})
        res.status(200).json(getStore)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" })
    }
}

exports.addLogo = async (req, res) => {
    try {
        await storeSchema.findOneAndUpdate({}, {logo: req.body.logo})
        res.status(200).send('updated')
    } catch (err) {
        res.status(500).send({ errMsg: "Internal server error" })
    }
}