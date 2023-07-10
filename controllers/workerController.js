
const employeeSchema = require('../models/employeeModel')
const subManagersSchema = require('../models/subManagerSchema')
const workerSchema = require('../models/workersModel')
const mongoose = require('mongoose')
exports.createWorker = async (req, res) => {
    try {
        const newWorker = new workerSchema({ name: req.body.name, employeeCode: req.body.empId, department: req.body.department });
        await newWorker.save();
        const workerId = new mongoose.Types.ObjectId(newWorker._id)
        const updateSubManager = await subManagersSchema.findOneAndUpdate(req.body.subManagerId, { $push: { workers: workerId } })
        const updateEmployee = await employeeSchema.findByIdAndUpdate(req.body.empId, { $set: { role: 'worker' } })

        res.status(200).json(newWorker)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
        console.log(error);
    }
}

exports.getManager = async (req, res) => {
    try {
        const getAstManagers = await workerSchema.find({})
        res.status(200).json(getAstManagers)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
    }
}