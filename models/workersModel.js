const mongoose = require('mongoose');
const workerSchema = new mongoose.Schema({
    name: String,
    employeeCode: mongoose.Types.ObjectId,
});
const SubManager = mongoose.model('Store', workerSchema);
module.exports = SubManager;