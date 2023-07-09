const mongoose = require('mongoose');
const subManagerSchema = new mongoose.Schema({
    name: String,
    employeeCode: mongoose.Types.ObjectId,
    department: String,
    workers: Array
});
const SubManager = mongoose.model('SubManager', subManagerSchema);
module.exports = SubManager;