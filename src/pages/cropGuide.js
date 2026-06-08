import React from "react";
import { useParams } from "react-router-dom";
import cropData from "../data/cropData";
import "./CropGuide.css";

const CropGuide = () => {

  const { cropId } = useParams();

  const crop = cropData.find(c => c.id === cropId);

  if(!crop) return <h2>Crop not found</h2>;

  const guide = crop.guide;

  return (

    <div className="guide-container">

      <h1>{crop.name} Cultivation Guide</h1>

      {Object.entries(guide).map(([title, text], index) => (

        <div key={index} className="guide-card">

          <h3>{title.replace(/([A-Z])/g," $1")}</h3>

          <p>{text}</p>

        </div>

      ))}

    </div>

  );
};

export default CropGuide;