import React, { useEffect, useState } from "react";
import axios from "axios";
import UserModel from "../components/User";
import logo from "./logo.png";

function Home() {
  const [Blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const api = await axios.get(
        `https://blog-application-e9ne.onrender.com/api/blogs/allblogs`,
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

  return (
    <div className="container" style={{ width: "60%", minWidth: "350px" }}>
      {Blog.map((data) => {
        return (
          <div className="card my-3 text-center">
            <div className="row g-0">
              <div className="col-md-6">
                <img src={data.imgUrl} className="card_img m-2" alt={logo} />
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
                  <h5 className="card-title">{data.title}</h5>
                  <p className="card-text">{data.description}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {data.createdAt}
                    </small>
                  </p>
                  <UserModel id={data.user} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
