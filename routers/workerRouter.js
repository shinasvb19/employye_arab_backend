const express = require("express");
const {
    createWorker, getManager
} = require("../controllers/workerController");
const router = express.Router();
router.post("/add-worker", createWorker);
router.get("/get-asst-manager", getManager)

module.exports = router;