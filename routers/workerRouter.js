const express = require("express");
const {
    createWorker
} = require("../controllers/workerController");
const router = express.Router();
router.post("/add-worker", createWorker);

module.exports = router;