const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("la base de datos esta conectada"))
  .catch((err) => console.log(err));
