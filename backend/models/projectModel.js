const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: false },
    organization: { type: String, required: false },
    domains: { type: [String], required: false },
    description: { type: String, required: false },
    techstacks: { type: [String], required: false },
    contributors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    ],
    mentors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    ],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    file: { type: String, required: false },
    img: {
      type: "String",
      required: false,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3cu8_R3bC2-eJXinPguYd2Dk14RY3yxkZuA&usqp=CAU",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;

//
