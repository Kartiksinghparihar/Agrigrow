import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import video from "../assets/farm.mp4";
import logo from "../assets/logo.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="landing">
      <video autoPlay loop muted playsInline className="video-bg">
        <source src={video} type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <div className="landing-content">
        <img src={logo} alt="logo" />

        <h1>{t("landing.title")}</h1>
        <p>{t("landing.subtitle")}</p>

        <button onClick={() => navigate("/login")}>
          {t("landing.getStarted")}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;