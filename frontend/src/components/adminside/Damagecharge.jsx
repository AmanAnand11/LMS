import React from 'react'
import { useState,useEffect } from 'react';
import Unauthorized from '../../Unauthorized';
import { VITE_BACKEND_URL } from "../../App";
function Damagecharge() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/userData`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
        body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "admin") {
          setAdmin(true);
        }

        setUserData(data.data);
        

        // if (data.data == "token expired") {
        //   alert("Token expired login again");
        //   window.localStorage.clear();
        //   window.location.href = "../";
        // }
      });
  }, []);

  return userData.userType === "admin" ?(
    <div>Damagecharge</div>
  ) : (
    <div><Unauthorized/></div>
  )
}

export default Damagecharge