const express = require("express");

const {
    createStore, getStore
} = require("../controllers/storeController");
const router = express.Router();
router.post("/add-store", createStore);
router.get("/get-store", getStore);
module.exports = router;