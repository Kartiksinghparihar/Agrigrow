import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AgriLearn.css";

import wheat from "../assets/wheat.png";
import rice from "../assets/rice.png";
import corn from "../assets/corn.png";
import ragi from "../assets/ragi.png";
import sugarcane from "../assets/sugarcane.png";

import apple from "../assets/apple.jpg";
import grapes from "../assets/grapes.jpg";
import banana from "../assets/banana.jpg";
import mango from "../assets/mango.jpg";
import orange from "../assets/orange.jpg";

import potato from "../assets/potato.jpg";
import tomato from "../assets/tomato.jpg";
import onion from "../assets/onion.jpg";
import carrot from "../assets/carrot.jpg";
import cabbage from "../assets/cabbage.jpg";

import bg from "../assets/Agrilearnback.png";

// Hindi → English mapping
const hindiToEnglish = {
  "गेहूं": "wheat", "gehun": "wheat", "gehu": "wheat",
  "चावल": "rice", "chawal": "rice",
  "मक्का": "corn", "makka": "corn",
  "रागी": "ragi",
  "गन्ना": "sugarcane", "ganna": "sugarcane",
  "सेब": "apple", "seb": "apple",
  "अंगूर": "grapes", "angoor": "grapes",
  "केला": "banana", "kela": "banana",
  "आम": "mango", "aam": "mango",
  "संतरा": "orange", "santra": "orange",
  "आलू": "potato", "alu": "potato",
  "टमाटर": "tomato", "tamatar": "tomato",
  "प्याज": "onion", "pyaj": "onion",
  "गाजर": "carrot", "gajar": "carrot",
  "पत्ता गोभी": "cabbage", "patta gobhi": "cabbage"
};

// crops data (unchanged)
const crops = [
  { id: "wheat", name: "Wheat", image: wheat, category: "Field Crops" },
  { id: "rice", name: "Rice", image: rice, category: "Field Crops" },
  { id: "corn", name: "Corn", image: corn, category: "Field Crops" },
  { id: "ragi", name: "Ragi", image: ragi, category: "Field Crops" },
  { id: "sugarcane", name: "Sugarcane", image: sugarcane, category: "Field Crops" }
];

const fruits = [
  { id: "apple", name: "Apple", image: apple, category: "Fruits" },
  { id: "grapes", name: "Grapes", image: grapes, category: "Fruits" },
  { id: "banana", name: "Banana", image: banana, category: "Fruits" },
  { id: "mango", name: "Mango", image: mango, category: "Fruits" },
  { id: "orange", name: "Orange", image: orange, category: "Fruits" }
];

const vegetables = [
  { id: "potato", name: "Potato", image: potato, category: "Vegetables" },
  { id: "tomato", name: "Tomato", image: tomato, category: "Vegetables" },
  { id: "onion", name: "Onion", image: onion, category: "Vegetables" },
  { id: "carrot", name: "Carrot", image: carrot, category: "Vegetables" },
  { id: "cabbage", name: "Cabbage", image: cabbage, category: "Vegetables" }
];

const AgriLearn = () => {

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filterItems = (items) => {
    return items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category)
    );
  };

  // 🎤 Voice Search (FIXED WITH LANGUAGE SWITCH)
  const handleVoiceSearch = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t("agrilearn.voiceNotSupported"));
      return;
    }

    const recognition = new SpeechRecognition();

    // 🔥 dynamic language
    recognition.lang = i18n.language === "hi" ? "hi-IN" : "en-IN";

    recognition.start();

    recognition.onresult = (event) => {
      let spokenText = event.results[0][0].transcript.toLowerCase().trim();

      for (let key in hindiToEnglish) {
        if (spokenText.includes(key)) {
          spokenText = hindiToEnglish[key];
          break;
        }
      }

      setSearch(spokenText);
    };

    recognition.onerror = (event) => {
      alert(t("agrilearn.voiceError") + ": " + event.error);
    };
  };

  return (
    <div className="agrilearn-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="agrilearn-overlay">
        <div className="agrilearn-content">

          <h1 className="agrilearn-title">{t("agrilearn.title")}</h1>

          <div className="search-box">

            <input
              placeholder={t("agrilearn.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="All">{t("agrilearn.all")}</option>
              <option value="Field Crops">{t("agrilearn.field")}</option>
              <option value="Fruits">{t("agrilearn.fruits")}</option>
              <option value="Vegetables">{t("agrilearn.vegetables")}</option>
            </select>

            <button onClick={handleVoiceSearch}>
              🎤 {t("agrilearn.speak")}
            </button>

          </div>

          {(category === "All" || category === "Field Crops") && (
            <>
              <h2 className="section-title">{t("agrilearn.field")}</h2>
              <div className="crop-grid">
                {filterItems(crops).map((crop) => (
                  <div key={crop.id} className="crop-card" onClick={() => navigate(`/crop/${crop.id}`)}>
                    <img src={crop.image} alt={crop.name} />
                    <p>{t(`crops.${crop.id}`)}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {(category === "All" || category === "Fruits") && (
            <>
              <h2 className="section-title">{t("agrilearn.fruits")}</h2>
              <div className="crop-grid">
                {filterItems(fruits).map((fruit) => (
                  <div key={fruit.id} className="crop-card" onClick={() => navigate(`/crop/${fruit.id}`)}>
                    <img src={fruit.image} alt={fruit.name} />
                    <p>{t(`crops.${fruit.id}`)}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {(category === "All" || category === "Vegetables") && (
            <>
              <h2 className="section-title">{t("agrilearn.vegetables")}</h2>
              <div className="crop-grid">
                {filterItems(vegetables).map((veg) => (
                  <div key={veg.id} className="crop-card" onClick={() => navigate(`/crop/${veg.id}`)}>
                    <img src={veg.image} alt={veg.name} />
                    <p>{t(`crops.${veg.id}`)}</p>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default AgriLearn;