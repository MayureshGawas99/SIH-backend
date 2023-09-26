const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: "djuseai07",
//   api_key: "547487933559229",
//   api_secret: "Q7kX9JTVzzPCo8Kn-P6Mumj4Aro",
// });

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const registerUser = asyncHandler(async (req, res) => {
  console.log("register");
  const { name, email, password, organization } = req.body;

  if (!name || !email || !password || !organization) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    organization,
  });

  if (user) {
    res.status(201).json({ ...user._doc, token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  console.log("In Login");
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ ...user._doc, token: generateToken(user._id) });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const updateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const { name, about, organization, pic, domains, techstacks } = req.body;
    const old = await User.findById(req.user._id);
    if (old) {
      if (name) {
        old.name = name;
      }
      if (about) {
        old.about = about;
      }
      if (organization) {
        old.organization = organization;
      }
      if (pic) {
        old.pic = pic;
      }
      if (JSON.parse(domains).length) {
        old.domains = JSON.parse(domains);
      }
      if (JSON.parse(techstacks).length) {
        old.techstacks = JSON.parse(techstacks);
      }

      console.log(old);
      const updatedDocument = await User.findByIdAndUpdate(req.user._id, old, {
        new: true,
      });
      if (updatedDocument) {
        res.status(200).send("Updated Succefully");
      }
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const getDetails = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allUsers,
  registerUser,
  authUser,
  updateProfile,
  getDetails,
};
