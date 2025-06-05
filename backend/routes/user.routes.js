const express = require("express");
const multer = require("multer");

const {
  creat,
  read,
  readOne,
  update,
  remove,
} = require("../controller/user.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fileSpite = file.originalname.split(".");
    const filePath =
      file.fieldname +
      "-" +
      fileSpite[0] +
      "-" +
      uniqueSuffix +
      "." +
      fileSpite[1];

    cb(null, filePath);
  },
});

const upload = multer({ storage: storage });

const route = express.Router();

route.get("/", read);

route.post("/", upload.single("avatar"), creat);

route.get("/:id", readOne);

route.put("/:id", update);

route.delete("/:id", remove);

module.exports = route;
