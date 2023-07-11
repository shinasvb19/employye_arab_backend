const express = require("express");
const {
    createWorker, getManager, addCoworker, getWorkers, lookUpEmployee, editProfile, getProfiles, getCoWorkersDetails, deleteCoWorker, deleteFile
} = require("../controllers/workerController");
const router = express.Router();
router.post("/add-worker", createWorker);
router.get("/get-asst-manager", getManager)
router.post("/add-co-worker", addCoworker)
router.get("/all-worker-employee", getCoWorkersDetails)
router.get('/get-co-workers/:id', lookUpEmployee)
router.get('/get-workers/:id', getWorkers)
router.get('/get-profiles/:id', getProfiles)
router.patch('/edit-profile/:id', editProfile)
router.post('/delete-co-worker/:id', deleteCoWorker)
router.post('/delete-file/:id', deleteFile)
module.exports = router;