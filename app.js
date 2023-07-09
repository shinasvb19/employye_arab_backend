const express = require('express');
const dbConnect = require('./dbConnect')
const app = express();
const employeeRoute = require('./routers/employeeRouter');
const storeRoute = require('./routers/storeRouter');
const managerRoute = require('./routers/managerRouter');
const cors = require('cors')
dbConnect.on('error', console.error.bind(console, 'connection error:'));
dbConnect.once('open', function () {
    console.log("Connected successfully");
});
app.use(cors())
app.use(express.json())
app.use('/api', employeeRoute)
app.use('/api', storeRoute)
app.use('/api', managerRoute)
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
