const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    name: String,
    department: String,
    subManagers: Array,
    employeeCode: mongoose.Types.ObjectId,

});
const Manager = mongoose.model('Manager', managerSchema);
module.exports = Manager;