import { color } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/layout/ProjectCard";
const Home = () => {
  const Categories = ["Java", "Python", "CSS", "HTML", "JavaScript"];
  const RecentProject = [
    { title: "Python3 Project", tech: ["Python3"] },
    { title: "Java Project", tech: ["java", "Swing"] },
    { title: "React Project", tech: ["MongoDB", "React", "Node"] },
    { title: "Python# Project", tech: ["C#"] },
  ];

  return (
    <div>
      <div className="background-image mb-2">
        <div>
          <h2 className="text-center">
            EMPOWERING MINDS, IGNITING INNOVATION,
          </h2>
          <h2 className="text-center">YOUR GATEWAY TO STUDENT PROJECTS.</h2>
        </div>
      </div>
      <div className="container mb-2">
        <h3>Categories</h3>
        <div>
          <button
            type="button"
            class="btn btn-info me-2"
            style={{ borderRadius: "50px" }}
          >
            All Categories
          </button>
          {Categories.map((cat) => (
            <button
              type="button"
              class="btn btn-outline-info me-2"
              style={{ borderRadius: "50px", color: "black" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="container">
        <Link to={"/"} className="d-flex justify-content-between">
          <h3>Recently Added</h3>
          <span className="material-symbols-outlined">chevron_right</span>
        </Link>
        <div className="d-flex gap-2 overflow-auto">
          {RecentProject.map((pro) => (
            <div>
              <ProjectCard title={pro.title} tech={pro.tech} />
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
