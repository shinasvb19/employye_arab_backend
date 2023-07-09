const mongoose = require('mongoose');
const workerSchema = new mongoose.Schema({
    name: String,
    employeeCode: mongoose.Types.ObjectId,
});
const Worker = mongoose.model('Worker', workerSchema);
module.exports = Worker;