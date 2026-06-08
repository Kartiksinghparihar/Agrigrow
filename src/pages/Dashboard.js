import React from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import bg from "../assets/plant.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  return (

    <div
      className="dashboard"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <Navbar />

      <div className="hero">

        <div className="hero-box">

          <h1>
            <span>Smart Agriculture</span>
            <br />
            Made Simple
          </h1>

          <p>
            Detect crop diseases instantly using AI and get treatment suggestions.
          </p>

          <div className="hero-buttons">

            {/* AI Diagnose */}
            <button
              className="primary-btn"
              onClick={() => navigate("/diagnose")}
            >
              🌿 Start AI Diagnosis
            </button>

            {/* Report Problem */}

          </div>

        </div>

      </div>

      {/* Floating AI Chatbot */}
      

    </div>

  );

};

export default Dashboard;