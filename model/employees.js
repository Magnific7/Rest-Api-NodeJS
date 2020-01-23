const mongoose = require('mongoose')

const employeesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employeePosition: {
        type: String,
        required: true
    },
    joiningDate: {
        type: String,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model('Employees', employeesSchema )