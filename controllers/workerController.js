const employeeSchema = require("../models/employeeModel");
const subManagersSchema = require("../models/subManagerSchema");
const workerSchema = require("../models/workersModel");
const mongoose = require("mongoose");
exports.createWorker = async (req, res) => {
  try {
    console.log(req.body);
    const newWorker = new workerSchema({
      name: req.body.name,
      employeeCode: req.body.empId,
      department: req.body.department,
    });
    await newWorker.save();
    const workerId = new mongoose.Types.ObjectId(newWorker._id);
    const updateSubManager = await subManagersSchema.findByIdAndUpdate(
      req.body.subManagerId,
      { $push: { workers: workerId } }
    );
    const updateEmployee = await employeeSchema.findByIdAndUpdate(
      req.body.empId,
      { $set: { role: "worker" } }
    );

    res.status(200).json(newWorker);
  } catch (error) {
    res.status(500).send({ errMsg: "Internal server error" });
    console.log(error);
  }
};

exports.getWorkers = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const workers = await subManagersSchema.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      { $unwind: "$workers" },
      {
        $lookup: {
          from: "workers",
          localField: "workers",
          foreignField: "_id",
          as: "worker",
        },
      },
      { $unwind: "$worker" },
      {
        $lookup: {
          from: "employees",
          localField: "worker.employeeCode",
          foreignField: "_id",
          as: "employee",
        },
      },
      {$unwind: '$employee'}
    ]);
    res.status(200).json(workers)
  } catch (error) {
    res.status(500).send({ errMsg: "Internal server error" });
  }
};
