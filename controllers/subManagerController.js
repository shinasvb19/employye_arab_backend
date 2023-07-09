const managerSchema = require('../models/managerModel')
const storeSchema = require('../models/storeModel')
const employeeSchema = require('../models/employeeModel')
const subManagersSchema = require('../models/subManagerSchema')
const mongoose = require('mongoose')
exports.createSubManager = async (req, res) => {
    try {
        const employeeCode = new mongoose.Types.ObjectId(req.body.empId)
        const newSubManager = new subManagersSchema({ name: req.body.name, employeeCode, department: req.body.department });
        await newSubManager.save();
        const store = await storeSchema.findById(req.body.storeId)
        const managerId = new mongoose.Types.ObjectId(store.manager)
        const submanagerId = new mongoose.Types.ObjectId(newSubManager._id)
        await managerSchema.findByIdAndUpdate(managerId, { $push: {subManagers : submanagerId } })
        await employeeSchema.findByIdAndUpdate(employeeCode, { $set: { role: 'submanager' } })
        res.status(200).json(newSubManager)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
        console.log(error);
    }
}   

exports.getSubManagers = async(req, res) => {
    try {
        const subManagers = await subManagersSchema.find();
        res.status(200).json(subManagers)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
    }
}