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
            { $unwind: '$employee' }
        ]);
        res.status(200).json(workers)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
    }
};
exports.getManager = async (req, res) => {
    try {
        const assManager = await workerSchema.find({})
        res.status(200).json(assManager)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });

    }
}
exports.addCoworker = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.body.empId)
        const updateAsstManager = await workerSchema.findByIdAndUpdate(
            req.body.asstId,
            { $push: { coWorkers: id } }
        );
        res.status(200).json(updateAsstManager)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
    }
}

exports.lookUpEmployee = async (req, res) => {
    console.log('object', req.params)
    let {id} = req.params
    id = new mongoose.Types.ObjectId(id)

    console.log(id)
    try {
        const result = await workerSchema.aggregate([{
            $match: { employeeCode: id },
        },
         {
            $unwind: "$coWorkers"
        }, {
            $lookup: {
                from: "employees",
                localField: "coWorkers",
                foreignField: "_id",
                as: "coWorkers",
            },
        }, {
            $lookup: {
                from: "employees",
                localField: "employeeCode",
                foreignField: "_id",
                as: "employee",
            },
        },
        { $unwind: '$employee'}
    ]

        )
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });

    }

}

exports.getProfiles = async (req, res) => {

    try {
        const foundUser = employeeSchema.findById(req.params.id)
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });
    }
}
exports.editProfile = async (req, res) => {
    try {
        const result = employeeSchema.findByIdAndUpdate(req.params.id, { $push: { files: req.body.files } })
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ errMsg: "Internal server error" });

    }
}
exports.getCoWorkersDetails = async (req, res) => {
    try {
        const coWorkersDetails = await employeeSchema.find({ del_flag: false, role: { $exists: false } })
        res.status(200).json(coWorkersDetails);
    } catch (error) {
        console.log(error)
        res.status(500).json({ errMsg: "Internal server error" });
    }
}