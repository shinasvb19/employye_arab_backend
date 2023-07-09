const express = require("express");

const {
    createStore
} = require("../controllers/storeController");
const router = express.Router();
router.post("/add-store", createStore);

module.exports = router;