import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isActive = (path) => location.pathname === path;

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div className="navbar">
      
      {/* LEFT */}
      <div className="left">
        <img src={logo} alt="logo" />
        <h3>{t("app.name")}</h3>
      </div>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* RIGHT */}
      <div className={`right ${menuOpen ? "active" : ""}`}>

        <Link className={isActive("/") ? "active-link" : ""} to="/">
          {t("navbar.home")}
        </Link>

        <Link className={isActive("/diagnose") ? "active-link" : ""} to="/diagnose">
          {t("navbar.diagnose")}
        </Link>

        <Link className={isActive("/sensor") ? "active-link" : ""} to="/sensor">
          {t("navbar.sensor")}
        </Link>

        <Link className={isActive("/plant-detection") ? "active-link" : ""} to="/plant-detection">
          {t("navbar.plantDetection")}
        </Link>

        {/* 🌟 SPECIAL BUTTON */}
        <Link
          className={`highlight ${isActive("/crop-recommendation") ? "active-link" : ""}`}
          to="/crop-recommendation"
        >
          🌾 {t("navbar.cropRecommendation")}
        </Link>

        <Link className={isActive("/agrilearn") ? "active-link" : ""} to="/agrilearn">
          {t("navbar.agrilearn")}
        </Link>

        <Link className={isActive("/weather") ? "active-link" : ""} to="/weather">
          {t("navbar.weather")}
        </Link>

        <Link className={isActive("/contact") ? "active-link" : ""} to="/contact">
          {t("navbar.contact")}
        </Link>

        {/* 🌐 Language Switch */}
        <div style={{ display: "flex", gap: "8px", marginLeft: "10px" }}>
          <button onClick={() => changeLang("en")}>EN</button>
          <button onClick={() => changeLang("hi")}>HI</button>
        </div>

      </div>
    </div>
  );
};

export default Navbar;