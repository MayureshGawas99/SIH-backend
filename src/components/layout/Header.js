import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Header = () => {
  const { user } = ChatState();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand text-bold " href="/">
          <span className="text-blue">Pro</span>
          <span className="text-lightblue">yog</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/profiles">
                Profiles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link " aria-current="page" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn  custom-btn" type="submit">
                  Search
                </button>
              </form>
            </li>
          </ul>
          {!user && (
            <div className="d-flex gap-2">
              <button
                className="btn  custom-btn"
                onClick={() => navigate("./login")}
              >
                Login
              </button>
              <button
                className="btn  blue-btn"
                onClick={() => navigate("./signup")}
              >
                SignUp
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
