const express = require("express");

const {
    createStore, getStore, addLogo
} = require("../controllers/storeController");
const router = express.Router();
router.post("/add-store", createStore);
router.get("/get-store", getStore);
router.post('/add-logo', addLogo)

module.exports = router;