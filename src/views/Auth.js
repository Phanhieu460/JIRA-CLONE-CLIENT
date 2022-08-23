import { Spin } from "antd";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const Auth = ({ authRoute }) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    let body
    // if (authLoading) {
    //     body = <div className="d-flex justify-content-center mt-2">
    //         <Spin/>
    //     </div>
    // } else if (isAuthenticated) {
    //     return <Redirect to='/board'/>
    // } else {

    //     body = (
    //       <>
    //         {authRoute === "login" && <Login />}
    //         {authRoute === "register" && <Register />}
    //       </>
    //     );
    // }
    body = (
        <>
          {authRoute === "login" && <Login />}
          {authRoute === "register" && <Register />}
        </>
      );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-iiner">
            {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
