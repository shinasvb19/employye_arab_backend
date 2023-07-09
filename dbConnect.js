
const mongoose = require('mongoose');
const mongoDBURL = 'mongodb+srv://zarastore:zarastorezara@zarastore.w2rsjwv.mongodb.net/Store-Management?retryWrites=true&w=majority';

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const dbConnect = mongoose.connection;

module.exports = dbConnect;
