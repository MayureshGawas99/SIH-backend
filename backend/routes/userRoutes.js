const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  updateProfile,
  getDetails,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.route("/self").get(protect, getDetails);
router.post("/login", authUser);
router.put("/update", protect, updateProfile);

module.exports = router;
