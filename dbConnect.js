const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_DEV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err.message));
module.exports = mongoose.connection;
