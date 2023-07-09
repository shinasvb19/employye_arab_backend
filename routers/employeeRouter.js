const express = require("express");

const {
    createEmployee, getEmployee, deleteEmployee
} = require("../controllers/employeeController");
const router = express.Router();
router.post("/add-employee", createEmployee);
router.get("/get-employee", getEmployee);
router.patch("/delete-employee", deleteEmployee);
module.exports = router;