const managerSchema = require("../models/managerModel");
const storeSchema = require("../models/storeModel");
const employeeSchema = require("../models/employeeModel");
const mongoose = require("mongoose");
exports.createManager = async (req, res) => {
  try {
    const employeeCode = new mongoose.Types.ObjectId(req.body.empId);
    const newManager = new managerSchema({ name: req.body.name, employeeCode });
    await newManager.save();
    await storeSchema.findByIdAndUpdate(req.body.storeId, {
      $set: { manager: newManager._id },
    });
    await employeeSchema.findByIdAndUpdate(employeeCode, {
      $set: { role: "manager" },
    });
    res.status(200).json(newManager);
  } catch (error) {
    res.status(500).send({ errMsg: "Internal server error" });
    console.log(error);
  }
};

exports.getManager = async (req, res) => {
  try {
    const manager = await managerSchema.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "employeeCode",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
    ]);
    console.log(manager);
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).send({ errMsg: "Internal server error" });
  }
};
