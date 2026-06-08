import React, { useEffect, useState } from "react";
import "./Sensor.css";
import { rtdb } from "../firebase";
import { ref, onValue } from "firebase/database";


function Sensor() {
  const [data, setData] = useState({});
  const [alertPlayed, setAlertPlayed] = useState(false);
  const [pumpAlertShown, setPumpAlertShown] = useState(false); // 🔥 NEW

  useEffect(() => {
    const sensorRef = ref(rtdb, "sensor");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const newData = snapshot.val();
        console.log("🔥 Firebase Data:", newData);

        setData(newData);

        // 🔔 Soil alert sound
        if (newData.soil < 2000 && !alertPlayed) {
          const audio = new Audio("/alert.mp3");
          audio.play();
          setAlertPlayed(true);
        }

        if (newData.soil > 2000) {
          setAlertPlayed(false);
        }

        // 🚿 🔥 PUMP POPUP ALERT (NO SPAM)
        if (newData.pump === "ON" && !pumpAlertShown) {
          alert("🚿 Pump is ON! Soil is dry.");
          setPumpAlertShown(true);
        }

        if (newData.pump === "OFF") {
          setPumpAlertShown(false);
        }
      }
    });

    return () => unsubscribe();

  }, [alertPlayed, pumpAlertShown]);

  const soilColor =
    data?.soil < 2000 ? "red" :
    data?.soil < 3000 ? "orange" :
    "green";

  const statusEmoji =
    data?.soil < 2000 ? "🚨" :
    data?.soil < 3000 ? "⚠️" :
    "✅";

  return (
    <div className="sensor-container">

      {/* HEADER */}
      <div className="header">
        <h1>🌿 Smart Farm Dashboard</h1>
        <p>Real-time Monitoring System</p>
      </div>

      {/* GRID */}
      <div className="grid">

        <div className="card">
          <h3>🌡 Temperature</h3>
          <p className="value">{data?.temperature ?? "--"} °C</p>
        </div>

        <div className="card">
          <h3>💧 Humidity</h3>
          <p className="value">{data?.humidity ?? "--"} %</p>
        </div>

        <div className={`card ${soilColor}`}>
          <h3>🌱 Soil Status</h3>
          <p className="value">{data?.soil_status ?? "--"}</p>
        </div>

        <div className="card">
          <h3>🚿 Pump</h3>
          <p className="value">{data?.pump ?? "OFF"}</p>
        </div>

      </div>

      {/* STATUS */}
      <div className="status-panel">
        <h2>{statusEmoji} System Status</h2>
        <p>{data?.alert ?? "All systems normal ✅"}</p>
      </div>

    </div>
  );
}

export default Sensor;