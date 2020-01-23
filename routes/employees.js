const express = require('express')
const router = express.Router()
const Employees = require('../model/employees')
const testEmp = require('../model/employees')

//Getting all
router.get('/', async (req, res) => {
    try {
       const employees = await Employees.find()
       res.json(employees)
    }  catch (err) {
       res.status(500).json({ message: err.message })
    }
})
//Getting one
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employees)
})
//Creating one
router.post('/', async (req, res) => {
    const employees = new Employees({
        name : req.body.name,
        employeePosition : req.body.employeePosition
    })
    try {
        const newEmployees = await employees.save()
        res.status(201).json(newEmployees)
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
})
//Updating one
router.patch('/:id',getEmployee,async(req, res) => {
    if (req.body.name !== null) {
        res.employees.name = req.body.name
    }
    if (req.body.employeePosition !== null) {
        res.employees.employeePosition = req.body.employeePosition
    }
    try {
        const UpdateEmployee = await res.employees.save()
        res.json(UpdateEmployee)
    } catch {
        res.status(400).json({message: err.message})
    }

})
//Deleting one
router.delete('/:id',getEmployee, async (req, res) => {
    try {
        await res.employees.remove()
        res.json({message: ' Employee Deleted'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
async function getEmployee(req, res, next){
    try {
        employees = await Employees.findById(req.params.id)
        if (employees ==  null) {
            return res.status(404).json({message: 'Cannot find employee'})
        }
    } catch(err) {
        return res.status(500).json({message: err.message })
    }
    res.employees = employees
    next()
}

module.exports = router