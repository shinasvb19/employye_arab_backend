const express = require("express");
const {
    createSubManager
} = require("../controllers/subManagerController");
const router = express.Router();
router.post("/add-sub-manager", createSubManager);
module.exports = router;