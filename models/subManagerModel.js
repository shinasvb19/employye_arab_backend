const mongoose = require('mongoose');
const subManagerSchema = new mongoose.Schema({
    name: String,
    employeeCode: mongoose.Types.ObjectId,
    workers: Array
});
const SubManager = mongoose.model('Store', subManagerSchema);
module.exports = SubManager;