const express = require("express");
const {
    createSubManager, getSubManagers
} = require("../controllers/subManagerController");
const router = express.Router();
router.post("/add-sub-manager", createSubManager);
router.get('/get-sub-manager', getSubManagers);
module.exports = router;