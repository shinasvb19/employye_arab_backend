const express = require("express");
const {
    createWorker, getManager, addCoworker, getWorkers, lookUpEmployee
} = require("../controllers/workerController");
const router = express.Router();
router.post("/add-worker", createWorker);
router.get("/get-asst-manager", getManager)
router.post("/add-co-worker", addCoworker)

router.get('/get-workers/:id', getWorkers)
router.get('/get-co-workers/:1d', lookUpEmployee)
module.exports = router;