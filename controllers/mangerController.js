const managerSchema = require('../models/managerModel')
const storeSchema = require('../models/storeModel')
const employeeSchema = require('../models/employeeModel')
exports.createManager = async (req, res) => {
    try {
        const newManager = new managerSchema(req.body);
        await newManager.save();
        const updateStore = await storeSchema.findOneAndUpdate(req.body.id, { $set: { manager: req.body.empId } })
        const updateEmployee = await employeeSchema.findOneAndUpdate(req.body.empId, { $set: { role: 'manager' } })
        res.status(200).json(newManager)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
        console.log(error);
    }
}