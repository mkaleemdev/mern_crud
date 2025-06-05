const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./routes/user.routes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

dotenv.config();

const PORT = process.env.PORT || 1000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("database is connect");

    app.listen(PORT, () => {
      console.log("server is runnig", PORT);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);
