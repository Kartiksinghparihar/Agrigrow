import React from "react";
import "./CropGuide.css";

const SugarcaneGuide = () => {

  return (
    <div className="guide-container">

      <h1>Sugarcane (CO 18009) Cultivation Guide</h1>

      <div className="guide-card">
        <h3>1. Land and Soil Preparation</h3>
        <p>
        Select deep, fertile and well-drained soils.
        Plough land 3-4 times to achieve fine tilth.
        Form ridges and furrows at 90-120 cm spacing.
        Apply FYM during final ploughing.
        </p>
      </div>

      <div className="guide-card">
        <h3>2. Soil Type and pH</h3>
        <p>
        Best soils: Loamy, clay loam or alluvial soils.
        Ideal pH: 6.5 – 7.5
        Avoid saline or waterlogged soils.
        </p>
      </div>

    </div>
  );

};

export default SugarcaneGuide;