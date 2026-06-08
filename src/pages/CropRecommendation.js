import { useState } from "react";
import axios from "axios";
import "./CropRecommendation.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function CropRecommendation() {
  const [form, setForm] = useState({
    Nitrogen: "", Phosphorus: "", Potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getRecommendation = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", form);
      setResult(res.data.recommendations);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="crop-page">
      <h1>🌾 Smart Crop Recommendation</h1>

      {/* INPUT */}
      <div className="input-box">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.toUpperCase()}
            onChange={handleChange}
          />
        ))}
      </div>

      <button onClick={getRecommendation}>
        {loading ? "Analyzing..." : "Get Recommendation"}
      </button>

      {/* RESULTS */}
      {result.length > 0 && (
        <>
          <h2 className="result-title">🌱 Recommended Crops</h2>

          {/* 🌾 CARDS */}
          <div className="result-box">
            {result
              .filter((crop) => crop.confidence > 1)
              .map((crop, i) => (
                <div key={i} className={`card ${i === 0 ? "best" : ""}`}>
                  <h2 className="crop-name">{crop.name}</h2>

                  <div className="confidence">
                    {crop.confidence}%
                  </div>

                  {/* Progress Bar */}
                  <div className="progress">
                    <div
                      className="progress-fill"
                      style={{ width: `${crop.confidence}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>

          {/* 📊 CHART */}
          <div className="chart-container">
            <h3>📊 Confidence Graph</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={result}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="confidence" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}