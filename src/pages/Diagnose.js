import React, { useState, useEffect } from "react";
import "./Diagnose.css";
import bg from "../assets/dback.png";

function Diagnose() {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Backend test
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.text())
      .then(data => console.log("✅ Backend:", data))
      .catch(err => console.error("❌ Backend error:", err));
  }, []);

  // Upload image
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Upload a valid image");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // Detect
  const detectDisease = async () => {

    if (!image) {
      alert("Upload image first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://localhost:5000/detect-disease", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!data.disease || !data.plant) {
        throw new Error("Invalid response");
      }

      setResult(data);

    } catch (error) {
      console.error(error);
      alert("❌ Detection failed");
    }

    setLoading(false);
  };

  // Clean disease text
  const cleanDisease = result?.disease
    ?.replace(/_/g, " ")
    ?.replace(/\b\w/g, c => c.toUpperCase());

  return (

    <div
      className="diagnose-page"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <div className="glass-card">

        <h1>🌿 AI Crop Disease Detection</h1>

        <input type="file" onChange={handleImage} />

        {preview && (
          <img src={preview} className="preview" alt="leaf" />
        )}

        <button onClick={detectDisease}>
          Detect Disease
        </button>

        {loading && <p>🔍 AI analyzing image...</p>}

        {result && (

          <div className="result-card">

            {/* 🌿 Plant */}
            <h2 className="plant-name">🌿 {result.plant}</h2>

            {/* 🌱 Disease Badge */}
            <div className={`disease-badge ${
              result.disease === "Healthy" ? "healthy" : "diseased"
            }`}>
              🌱 {cleanDisease}
            </div>

            {/* 📊 Confidence */}
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>

            <p>Confidence: {result.confidence}%</p>

            {/* 💊 Treatment (FROM BACKEND) */}
            <h3>💊 Treatment</h3>

            <ul>
              {result.treatment?.length > 0 ? (
                result.treatment.map((t, i) => (
                  <li key={i}>{t}</li>
                ))
              ) : (
                <>
                  <li>⚠ No treatment data available</li>
                  <li>Consult agricultural expert</li>
                </>
              )}
            </ul>

          </div>

        )}

      </div>

    </div>
  );
}

export default Diagnose;