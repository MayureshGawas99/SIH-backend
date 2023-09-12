import React from "react";
import myImage from "../../images/projectIcon.png";

const ProjectCard = ({
  title = "New Web Dev",
  tech = ["HTML", "CSS", "JavaScript"],
  image = "ImageURL",
}) => {
  return (
    <div className="card" style={{ width: "15rem" }}>
      <img src={myImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <div className="mb-1">
          {tech.map((cat) => (
            <button
              type="button"
              class="btn btn-sm btn-outline-info me-2"
              style={{ borderRadius: "50px", color: "black", fontSize: "10px" }}
            >
              {cat}
            </button>
          ))}
        </div>
        <h5 className="card-title">{title}</h5>

        <a href="#" className="btn btn-primary">
          See More
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
