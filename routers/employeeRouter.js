const express = require("express");

const {
    createEmployee, getEmployee, deleteEmployee, editEmployee, editFileName
} = require("../controllers/employeeController");
const router = express.Router();
router.post("/add-employee", createEmployee);
router.get("/get-employee", getEmployee);
router.patch("/delete-employee", deleteEmployee);
router.post('/edit-employee/:id', editEmployee)
router.post('/edit-file-name/:id', editFileName)

module.exports = router;