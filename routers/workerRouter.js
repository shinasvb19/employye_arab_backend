const express = require("express");
const {
    createWorker, getWorkers
} = require("../controllers/workerController");
const router = express.Router();
router.post("/add-worker", createWorker);
router.get('/get-workers/:id', getWorkers)

module.exports = router;