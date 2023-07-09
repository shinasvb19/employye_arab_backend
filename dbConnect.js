
const mongoose = require('mongoose');
const mongoDBURL = 'mongodb://localhost:27017/storeManagement';

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const dbConnect = mongoose.connection;

module.exports = dbConnect;
