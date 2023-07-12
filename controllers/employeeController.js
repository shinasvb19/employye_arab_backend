const employeeSchema = require('../models/employeeModel');

exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = new employeeSchema(req.body);
        await newEmployee.save();
        res.status(200).json(newEmployee)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
        console.log(error);
    }
}

exports.getEmployee = async (req, res) => {
    try {
        const allEmployee = await employeeSchema.find({ del_flag: false })
        res.status(200).json(allEmployee);
    } catch (error) {
        console.log(error)
        res.status(500).json({ errMsg: "Internal server error" });
    }
}
exports.deleteEmployee = async (req, res) => {
    try {
        const updatedEmployee = await employeeSchema.findOneAndUpdate({ _id: req.body.id }, { $set: { del_flag: req.body.del_flag } }, { new: true })
        res.status(200).json(updatedEmployee)
    } catch (error) {
        res.status(500).json({ errMsg: "Internal server error" });
    }
}

exports.editEmployee = async(req, res) => {
    try {
        const {id} = req.params
        await employeeSchema.findByIdAndUpdate(id, req.body)
        res.status(200).json("successfully edited")
    } catch (err) {
        res.status(500).json({ errMsg: "Internal server error" });
    }
}

exports.editFileName = async(req, res) => {
    try {
        await employeeSchema.findOneAndUpdate(
            { _id: req.params.id, 'files._id': req.body.fileId },
            { $set: { 'files.$.fileName': req.body.fileName} },
            { upsert: true }
          )
          res.status(200).json('Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ errMsg: "Internal server error" });
        
    }
}