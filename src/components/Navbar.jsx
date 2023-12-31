import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import context from "../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

function Navbar() {
  const navigate = useNavigate();
  const logOut = async () => {
    const api = await axios.get(
      `https://blog-application-e9ne.onrender.com/api/users/logout`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // console.log(api);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    auth.setIsAuthenticated(false);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  const auth = useContext(context);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="z-2"
      />
      <div className="container-fluid navi bg-warning">
        <nav className="navbar navbar-expand-lg" style={{ height: "60px" }}>
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="Abyab Blogger" width="80%" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarnavdropdown"
            aria-controls="navbarnavdropdown"
            aria-expanded="false"
            aria-label="toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarnavdropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                {!auth.isAuthenticated && (
                  <Link
                    className="btn btn-outline-success mx-3"
                    to={"/register"}
                  >
                    Register
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {!auth.isAuthenticated && (
                  <Link className="btn btn-outline-success mx-3" to={"/login"}>
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {auth.isAuthenticated && (
                  <Link
                    className="btn btn-outline-success mx-3"
                    to={"/addblog"}
                  >
                    AddBlog
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {auth.isAuthenticated && (
                  <Link
                    className="btn btn-outline-success mx-3"
                    to={"/profile"}
                  >
                    Profile
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {auth.isAuthenticated && (
                  <button
                    className="btn btn-outline-success mx-3"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
