const Project = require("../models/projectModel");
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
    } = req.body;
    const newData = new Project({
      title,
      description,
      file,
      organization,
      domains: JSON.parse(domains),
      techstacks: JSON.parse(techstacks),
      contributors: JSON.parse(contributors),
      admin: req.user,
      mentors,
    });
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
    const projects = await Project.find({ admin: req.user._id });
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

module.exports = {
  uploadProject,
  getProjects,
  deleteProject,
};
