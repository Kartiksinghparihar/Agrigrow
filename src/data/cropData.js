const cropData = [

/* ================= FIELD CROPS ================= */

{
  id: "sugarcane",
  name: "Sugarcane",
  category: "Field Crop",
  guide: {

    landPreparation: `
    Select deep fertile soil and plough 3–4 times.
    Add FYM (25–30 tonnes/ha).
    Create ridges and furrows for proper drainage.
    `,

    soilType: `
    Loamy or alluvial soil is best.
    pH range: 6.5 – 7.5.
    Avoid waterlogged soil.
    `,

    climate: `
    Tropical crop requiring 20°C – 35°C.
    Needs good sunlight and rainfall.
    `,

    planting: `
    Use healthy setts with 2–3 buds.
    Row spacing: 90–120 cm.
    Plant in Feb–March or Sept–Oct.
    `,

    irrigation: `
    Irrigate every 7–10 days.
    Drip irrigation is highly beneficial.
    `,

    fertilizer: `
    Nitrogen: 150–250 kg/ha
    Phosphorus: 60–100 kg/ha
    Potassium: 60–120 kg/ha
    `,

    pestControl: `
    Common pests: borer, white grub.
    Use resistant varieties and pesticides.
    `,

    harvesting: `
    Harvest after 10–18 months.
    Cut close to ground level.
    `
  }
},

{
  id: "ragi",
  name: "Ragi",
  category: "Field Crop",
  guide: {

    landPreparation: `
    Plough land 2–3 times.
    Remove weeds and level properly.
    `,

    soilType: `
    Red loamy soil is ideal.
    pH: 5 – 7.
    Can grow in poor soils.
    `,

    climate: `
    Requires warm climate.
    Temperature: 20°C – 30°C.
    Drought tolerant crop.
    `,

    planting: `
    Sow seeds directly or transplant seedlings.
    Row spacing: 30 cm.
    `,

    irrigation: `
    Needs minimal irrigation.
    Rainfed crop in many regions.
    `,

    fertilizer: `
    Apply FYM + NPK fertilizers moderately.
    `,

    pestControl: `
    Control blast disease using fungicides.
    Maintain field hygiene.
    `,

    harvesting: `
    Harvest when grains harden.
    Usually after 3–4 months.
    `
  }
},

{
  id: "rice",
  name: "Rice",
  category: "Field Crop",
  guide: {

    landPreparation: `
    Plough and level field.
    Maintain water level.
    `,

    soilType: `
    Clayey soil with high water retention.
    pH: 5.5 – 7.
    `,

    climate: `
    Warm humid climate.
    Temperature: 20°C – 30°C.
    `,

    irrigation: `
    Maintain standing water.
    `,

    fertilizer: `
    N:120 P:60 K:40 kg/ha
    `
  }
},

{
  id: "wheat",
  name: "Wheat",
  category: "Field Crop",
  guide: {

    landPreparation: `
    Fine tilth soil required.
    Remove weeds.
    `,

    soilType: `
    Loamy soil.
    pH: 6–7.
    `,

    climate: `
    Cool climate crop.
    Temperature: 10–25°C.
    `,

    irrigation: `
    4–5 irrigations required.
    `,

    fertilizer: `
    N:120 P:60 K:40 kg/ha
    `
  }
},

{
  id: "corn",
  name: "Corn (Maize)",
  category: "Field Crop",
  guide: {

    landPreparation: `
    Deep ploughing required.
    `,

    soilType: `
    Well-drained soil.
    pH: 5.5 – 7.5.
    `,

    climate: `
    Warm climate.
    Temperature: 18–27°C.
    `,

    irrigation: `
    Irrigate during flowering.
    `,

    fertilizer: `
    N:150 P:60 K:40 kg/ha
    `
  }
},

/* ================= FRUITS ================= */

{
  id: "apple",
  name: "Apple",
  category: "Fruit",
  guide: {
    climate: `Cool climate required.`,
    soilType: `Loamy soil, pH 5.5–6.5.`,
    irrigation: `Regular watering needed.`,
    harvesting: `Harvest in autumn season.`
  }
},

{
  id: "banana",
  name: "Banana",
  category: "Fruit",
  guide: {
    climate: `Tropical climate.`,
    soilType: `Rich loamy soil.`,
    irrigation: `Frequent irrigation required.`,
    harvesting: `8–12 months after planting.`
  }
},

{
  id: "mango",
  name: "Mango",
  category: "Fruit",
  guide: {
    climate: `Warm tropical climate.`,
    soilType: `Well-drained soil.`,
    irrigation: `Moderate irrigation.`,
    harvesting: `Summer season.`
  }
},

{
  id: "orange",
  name: "Orange",
  category: "Fruit",
  guide: {
    climate: `Subtropical climate.`,
    soilType: `Sandy loam soil.`,
    irrigation: `Regular watering.`,
    harvesting: `Winter season.`
  }
},

{
  id: "grapes",
  name: "Grapes",
  category: "Fruit",
  guide: {
    climate: `Warm and dry climate.`,
    soilType: `Well-drained sandy soil.`,
    irrigation: `Controlled irrigation.`,
    harvesting: `3–4 months after flowering.`
  }
},

/* ================= VEGETABLES ================= */

{
  id: "potato",
  name: "Potato",
  category: "Vegetable",
  guide: {
    climate: `Cool climate.`,
    soilType: `Sandy loam soil.`,
    irrigation: `Regular watering.`,
    harvesting: `90–120 days after planting.`
  }
},

{
  id: "tomato",
  name: "Tomato",
  category: "Vegetable",
  guide: {
    climate: `Warm climate.`,
    soilType: `Loamy soil.`,
    irrigation: `Frequent irrigation.`,
    harvesting: `60–80 days after planting.`
  }
},

{
  id: "onion",
  name: "Onion",
  category: "Vegetable",
  guide: {
    climate: `Mild climate.`,
    soilType: `Well-drained soil.`,
    irrigation: `Moderate irrigation.`,
    harvesting: `3–4 months.`
  }
},

{
  id: "carrot",
  name: "Carrot",
  category: "Vegetable",
  guide: {
    climate: `Cool climate.`,
    soilType: `Sandy soil.`,
    irrigation: `Light irrigation.`,
    harvesting: `70–80 days.`
  }
},

{
  id: "cabbage",
  name: "Cabbage",
  category: "Vegetable",
  guide: {
    climate: `Cool climate.`,
    soilType: `Loamy soil.`,
    irrigation: `Regular watering.`,
    harvesting: `80–100 days.`
  }
}

];

export default cropData;