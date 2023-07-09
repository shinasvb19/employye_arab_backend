require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const employeeRoute = require('./routers/employeeRouter');
const storeRoute = require('./routers/storeRouter');
const managerRoute = require('./routers/managerRouter');
const subManagerRoute = require('./routers/subManager');
const cors = require('cors')


// Connect to the database using the connection string
mongoose.connect(process.env.MONGO_DEV_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
app.use(cors())
app.use(express.json())
app.use('/api', employeeRoute)
app.use('/api', storeRoute)
app.use('/api', managerRoute)
app.use('/api', subManagerRoute)
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
