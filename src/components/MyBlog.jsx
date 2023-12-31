import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import context from "../context/AuthContext";
import UserModel from "../components/User";

function MyBlog() {
  const [blog, setBlog] = useState([]);

  const auth = useContext(context);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const api = await axios.get(
        `https://blog-application-e9ne.onrender.com/api/blogs/myblogs`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(api.data.blogs);
      setBlog(api.data.blogs);
    };

    fetchBlog();
  }, []);

  const deleteBlog = async (id) => {
    const api = await axios.delete(
      `https://blog-application-e9ne.onrender.com/api/blogs/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // console.log(api.data.message);
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
  };

  const editBlog = async (id) => {
    auth.setId(id);
    navigate("/addblog");
  };

  return (
    <>
      <div
        className="container text-center my-5"
        style={{ width: "60%", minWidth: "350px" }}
      >
        {blog.map((data) => {
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
              />
              <div className="card my-2">
                <div className="row g-0">
                  <div className="col-md-6">
                    <img src={data.imgUrl} className="card_img m-2" alt="https://wallpapers.com/images/featured/indian-army-35e82zy24xfm0pgi.jpg" />
                  </div>
                  <div
                    className="col-md-6"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="card-body">
                      <h2 className="card-title">{data.title}</h2>
                      <p className="card-text">{data.description}</p>
                      <p className="card-text">
                        <small>{data.createdAt}</small>
                      </p>
                      <UserModel id={data.user} />
                      <button
                        onClick={() => editBlog(data._id)}
                        className="btn btn-warning mx-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(data._id)}
                        className="btn btn-danger mx-5"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default MyBlog;
