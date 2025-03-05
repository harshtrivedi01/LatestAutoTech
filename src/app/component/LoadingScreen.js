import React from "react";
import "./loadercss/loading.css"
import "./loadercss/loading.scss"
const LoadingScreen = () => {
  return (
    <div className="preloader">
    <div className="loader-container">
      <img src={"/images/logo.png"} alt="Logo" className="loader-logo" />
    </div>
  </div>
  );
};

export default LoadingScreen;
