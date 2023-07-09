const express = require("express");
const {
    createManager
} = require("../controllers/mangerController");
const router = express.Router();
router.post("/add-manager", createManager);
module.exports = router;