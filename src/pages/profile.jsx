import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import context from "../context/AuthContext";
import MyBlog from "../components/MyBlog";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

function Profile() {
  const auth = useContext(context);

  useEffect(() => {
    const fetchUser = async () => {
      const api = await axios.get(
        `https://blog-application-e9ne.onrender.com/api/users/myprofile`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(api.data.user);
      // setBlog(api.data.blogs)
      auth.setUser(api.data.user);
      auth.setIsAuthenticated(true);
    };

    fetchUser();
  }, []);

  return (
    <div className="text-center my-3">
      <h1>
        <BiSolidUserCircle /> {auth.user.name}
      </h1>
      <h1>
        <MdEmail />
        {auth.user.email}
      </h1>

      <MyBlog />
    </div>
  );
}

export default Profile;
