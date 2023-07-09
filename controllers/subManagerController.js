const managerSchema = require('../models/managerModel')
const storeSchema = require('../models/storeModel')
const employeeSchema = require('../models/employeeModel')
const subManagersSchema = require('../models/subManagersModel')
exports.createManager = async (req, res) => {
    try {
        const newSubManager = new subManagersSchema(req.body.name);
        await newSubManager.save();
        const updateStore = await storeSchema.findOneAndUpdate(req.body.id, { $set: { manager: req.body.empId } })
        const updateEmployee = await employeeSchema.findOneAndUpdate(req.body.empId, { $set: { role: 'manager' } })
        res.status(200).json(newManager)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
        console.log(error);
    }
}   