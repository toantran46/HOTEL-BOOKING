import React from "react";
import PropTypes from "prop-types";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "./pages/Home";
import GeneralManagement from "./pages/GeneralManagement";
import Booking from "./pages/Booking";
import ScrollTop from "components/ScrollTop";
import { useSelector } from "react-redux";

Hotel.propTypes = {};

function Hotel(props) {

  const { loggedIn } = useSelector(state => state.auth);

  return (
    <div className="wrapper-hotel">
      <Header />
      <ScrollTop />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/search" element={<MainPage />} />
        <Route path="/management/*" element={loggedIn ? <GeneralManagement /> : <Navigate to="/auth/sign-in" />} />
        <Route path="/:placeId" element={<PlaceDetailPage />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Hotel;
