const express = require("express");
const {
    createManager, getManager
} = require("../controllers/mangerController");
const router = express.Router();
router.post("/add-manager", createManager);
router.get('/get-manager', getManager)
module.exports = router;