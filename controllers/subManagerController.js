const managerSchema = require('../models/managerModel')
const storeSchema = require('../models/storeModel')
const employeeSchema = require('../models/employeeModel')
const subManagersSchema = require('../models/subManagersModel')
const mongoose = require('mongoose')
exports.createManager = async (req, res) => {
    try {
        const newSubManager = new subManagersSchema(req.body.name);
        await newSubManager.save();
        const submanagerId = new mongoose.Types.ObjectId(newSubManager._id)
        const updateManager = await managerSchema.findOneAndUpdate(req.body.managerId, { $push: { subManagers: submanagerId } })
        const updateEmployee = await employeeSchema.findOneAndUpdate(req.body.empId, { $set: { role: 'manager' } })
        res.status(200).json(newSubManager)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
        console.log(error);
    }
}   