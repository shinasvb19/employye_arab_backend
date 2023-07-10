const express = require("express");
const {
    createWorker, getManager, addCoworker, getWorkers
} = require("../controllers/workerController");
const router = express.Router();
router.get('/get-workers/:id', getWorkers)
router.post("/add-worker", createWorker);
router.get("/get-asst-manager", getManager)
router.post("/add-co-worker", addCoworker)
module.exports = router;