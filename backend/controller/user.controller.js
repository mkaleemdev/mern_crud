const user = require("../model/user.model");

// Create user
const creat = async (req, res) => {
  try {
    const newUser = new user({ ...req.body, imgUrl: req.file.path });
    const savedData = await newUser.save();
    res.status(201).json({
      message: "User Created Successfully",
      savedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to create user!",
    });
  }
};

// Read all users
const read = async (req, res) => {
  try {
    const getData = await user.find();
    res.status(200).json({
      message: "Users fetched successfully",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch data!",
    });
  }
};

const readOne = async (req, res) => {
  try {
    const id = req.params.id;
    const getData = await user.findById(id);
    res.status(200).json({
      message: "user feact successfully",
      data: getData,
    });
  } catch (error) {
    ress.status(500).json({
      message: "Unable to fetch Data !",
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    updateData = await user.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({
      message: "User Data Update is Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Update Data !",
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    deleteData = await user.findByIdAndDelete(id, data);
    res.status(200).json({
      message: "User delete Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Update Data !",
    });
  }
};

module.exports = {
  creat,
  read,
  readOne,
  update,
  remove,
};
