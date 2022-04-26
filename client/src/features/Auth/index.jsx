import React from "react";
import PropTypes from "prop-types";

import { Navigate, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import About from "./pages/About";
import ScrollTop from "components/ScrollTop";
import { useSelector } from "react-redux";

Auth.propTypes = {};

function Auth(props) {
  const { loggedIn } = useSelector(state => state.auth);
  return (
    <div className="auth">
      <ScrollTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={loggedIn ? <About /> : <Navigate to={'/auth/sign-in'} />} />
      </Routes>
    </div>
  );
}

export default Auth;
