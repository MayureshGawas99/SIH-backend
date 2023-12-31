const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  uploadProject,
  getProjects,
  deleteProject,
  getSingleProject,
  updateProject,
  getUserProjects,
  getProjectFile,
  getRecentProjects,
} = require("../controllers/projectController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Make sure 'uploads' is the correct path to your directory
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route("/").get(protect, getProjects);
router.route("/recent").get(getRecentProjects);
router.route("/single/:projectId").get(getSingleProject);
router.route("/file/:projectId").get(getProjectFile);
router.route("/user-projects/:userId").get(getUserProjects);
router.route("/upload").post(protect, upload.single("file"), uploadProject);
router
  .route("/update/:projectId")
  .put(protect, upload.single("file"), updateProject);
router.route("/delete/:projectId").delete(protect, deleteProject);
// router.route("/upload").post(protect, upload.single('file'),uploadProject);
// router.route("/").post(registerUser);
// router.post("/login", authUser);

module.exports = router;
