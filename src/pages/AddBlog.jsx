import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import context from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const auth = useContext(context);
  const navigate = useNavigate();
  //    console.log(auth)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const api = await axios.get(
        `https://blog-application-e9ne.onrender.com/api/blogs/blog/${auth.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(api.data.blog);
      setTitle(api.data.blog.title);
      setDescription(api.data.blog.description);
      setImgUrl(api.data.blog.imgUrl);
    };

    fetchBlog();
  }, [auth.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.id) {
      try {
        const api = await axios.post(
          `https://blog-application-e9ne.onrender.com/api/blogs/new`,
          {
            title,
            description,
            imgUrl,
          },
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

        auth.setIsAuthenticated(true);

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } catch (error) {
        // console.error(error)
        toast.error(error.response.data.message, {
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
      }
    } else {
      try {
        const api = await axios.put(
          `https://blog-application-e9ne.onrender.com/api/blogs/${auth.id}`,
          {
            title,
            description,
            imgUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log(api);
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

        auth.setIsAuthenticated(true);

        setTimeout(() => {
          navigate("/profile");
        }, 1500);

        auth.setId("");
      } catch (error) {
        // console.error(error)
        toast.error(error.response.data.message, {
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
      }
    }
  };
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
      <div className="container" style={{ width: "50%", minWidth: "350px" }}>
        {auth.id ? (
          <h1 className="text-center my-3">Edit Blog</h1>
        ) : (
          <h1 className="text-center my-3">Add Blog</h1>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your Blog title"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Descriptions
            </label>
            <textarea
              rows={"5"}
              placeholder="Add Your blog description here..."
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              This is best way to shear your thought with social Area
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              ImageLink
            </label>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Enter your Blog Image here"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-grid gap-2 my-5">
            {auth.id ? (
              <button type="submit" className="btn btn-primary">
                Edit Blog
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Add Blog
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBlog;
