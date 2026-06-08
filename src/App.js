import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CropGuide from "./pages/cropGuide";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";
import Diagnose from "./pages/Diagnose";
import Sensor from "./pages/Sensor";
import PlantDetection from "./pages/PlantDetection";
import CropRecommendation from "./pages/CropRecommendation";
import AgriLearn from "./pages/AgriLearn";
import SugarcaneGuide from "./pages/SugarcaneGuide";

import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function App() {

  const { i18n } = useTranslation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {

        setUser(currentUser);

        await setDoc(
          doc(db, "users", currentUser.uid),
          {
            email: currentUser.email || null,
            phone: currentUser.phoneNumber || null,
            createdAt: new Date()
          },
          { merge: true }
        );

      } else {
        setUser(null);
      }

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <Router>

      {/* 🌐 Language Switch */}
      <div style={{
        position: "fixed",
        top: 10,
        right: 10,
        zIndex: 1000,
        display: "flex",
        gap: "10px"
      }}>
        <button onClick={() => changeLang("en")}>EN</button>
        <button onClick={() => changeLang("hi")}>HI</button>
      </div>

      <Routes>

        <Route path="/agrilearn" element={<AgriLearn />} />
        <Route path="/crop/sugarcane" element={<SugarcaneGuide />} />
        <Route path="/crop/:cropId" element={<CropGuide />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/weather" element={<Weather />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/sensor" element={<Sensor />} />
        <Route path="/plant-detection" element={<PlantDetection />} />
        <Route path="/crop-recommendation" element={<CropRecommendation />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

      </Routes>

    </Router>

  );

}

export default App;