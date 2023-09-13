const express = require("express");
const {
  accessChat,
  fetchChats,
  fetchAcceptedChats,
  acceptChat,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  fetchNotAcceptedChats,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/accepted").get(protect, fetchAcceptedChats);
router.route("/not-accepted").get(protect, fetchNotAcceptedChats);
router.route("/accept-chat").put(protect, acceptChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
