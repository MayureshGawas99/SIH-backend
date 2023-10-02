const Project = require("../models/projectModel");
const fs = require("fs");
const sfs = require("fs").promises;
const path = require("path");
// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: "djuseai07",
//   api_key: "547487933559229",
//   api_secret: "Q7kX9JTVzzPCo8Kn-P6Mumj4Aro",
// });

const uploadProject = async (req, res) => {
  try {
    const file = req.file?.path;
    const {
      title,
      description,
      domains,
      techstacks,
      contributors,
      mentors,
      organization,
      img,
    } = req.body;
    const allData = {
      title,
      description,
      file,
      organization,
      domains: JSON.parse(domains),
      techstacks: JSON.parse(techstacks),
      contributors: JSON.parse(contributors),
      admin: req.user,
      mentors: JSON.parse(mentors),
    };
    if (img) {
      allData.img = img;
    }
    const newData = new Project(allData);
    await newData.save();

    res
      .status(201)
      .json({ message: "File uploaded and data saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while Uploading" });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ admin: req.user._id })
      .populate("contributors")
      .populate("mentors")
      .populate("admin");
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    // console.log(req.params);
    const removedDoc = await Project.findByIdAndDelete(projectId);
    if (removedDoc) {
      console.log("Removed document:", removedDoc);
      const filePath = removedDoc.file;
      fs.unlinkSync(`./${filePath}`);
      res.status(200).send({ message: "Deleted Sucessfully" });
    } else {
      console.log("Document not found.");
      res.status(404).send({ message: "File Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error While Deleting" });
  }
};

const getSingleProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Use Mongoose to find the project by ID and populate the fields
    const project = await Project.findById(projectId)
      .populate("contributors")
      .populate("mentors")
      .populate("admin");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Send the populated project details as a JSON response
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const file = req.file?.path;
    console.log("file", file);
    const {
      title,
      description,
      domains,
      techstacks,
      contributors,
      mentors,
      organization,
      img,
    } = req.body;
    const projectId = req.params.projectId;
    const old = await Project.findById(projectId);
    if (old) {
      if (title) {
        old.title = title;
      }
      if (description) {
        old.description = description;
      }
      if (organization) {
        old.organization = organization;
      }
      if (img) {
        old.img = img;
      }
      if (JSON.parse(domains).length) {
        old.domains = JSON.parse(domains);
      }
      if (JSON.parse(techstacks).length) {
        old.techstacks = JSON.parse(techstacks);
      }
      if (JSON.parse(contributors).length) {
        old.contributors = JSON.parse(contributors);
      }
      if (JSON.parse(mentors).length) {
        old.mentors = JSON.parse(mentors);
      }
      if (file) {
        const filePath = old.file;
        fs.unlinkSync(`./${filePath}`);
        old.file = file;
      }
      console.log(old);
      const updatedDocument = await Project.findByIdAndUpdate(projectId, old, {
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

const getUserProjects = async (req, res) => {
  try {
    console.log("Getting user projects");
    const { userId } = req.params;
    const projects = await Project.find({ contributors: userId })
      .populate("contributors")
      .populate("mentors")
      .populate("admin");

    res.status(200).send(projects);
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProjectFile = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    const filePath = project.file;
    console.log(filePath);
    const rootPath = path.resolve(__dirname, "../../");
    console.log(path.basename(filePath), "filename");
    const fullPath = path.join(rootPath, "uploads", filePath.substring(8));
    console.log(fullPath, "fullpath");
    res.status(200).sendFile(fullPath);
  } catch (error) {
    console.log(error);
    res.status(404).send("File not found");
  }
};

const getRecentProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number, default to 1
    const limit = parseInt(req.query.limit) || 10; // Number of projects per page, default to 10

    const startIndex = (page - 1) * limit;

    // Find all projects, sort by timestamp in descending order, and apply pagination
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Send the paginated projects as a response
    res.json(recentProjects);
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  uploadProject,
  getProjects,
  deleteProject,
  getSingleProject,
  getUserProjects,
  updateProject,
  getProjectFile,
  getRecentProjects,
};
