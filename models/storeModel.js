const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: String,
    storeId: String,
    manager: mongoose.Types.ObjectId,
    logo: String
});
const Store = mongoose.model('Store', storeSchema);
module.exports = Store;