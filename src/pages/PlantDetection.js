import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlantDetection.css";

export default function PlantDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle file upload
  const handleChange = (e) => {
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

  // Send to backend
  const handleSubmit = async () => {
    if (!image) {
      alert("Upload image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/detect-plant", // ✅ UPDATED API
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="header">
        <h1>🌿 Plant Detection</h1>
        <p>Offline AI System</p>
      </div>

      <div className="card">

        {/* Upload Section */}
        <div>
          <label className="upload-box">
            <input type="file" onChange={handleChange} hidden />
            <p>📤 Upload Image</p>
            {preview && <img src={preview} alt="preview" />}
          </label>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Detecting..." : "Detect"}
          </button>

          {loading && <p>🔍 Processing...</p>}
        </div>

        {/* Result Section */}
        <div className="result">
          {!result && <p>No result yet</p>}

          {result && (
            <>
              <h2>🌿 {result.plant}</h2>
              <p>🌱 Disease: {result.disease}</p>
              <p>✅ Confidence: {result.confidence}%</p>

              {/* Optional simple suggestion */}
              <div className="tip">
                💡 {result.disease === "Healthy"
                  ? "Plant is healthy. Maintain proper care."
                  : "Disease detected. Consider proper treatment and monitoring."}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}