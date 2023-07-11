const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    profilePic: String,
    role: String,
    del_flag: {
        type: Boolean,
        default: false
    },
    files: {
        type: Array
    }
});
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
