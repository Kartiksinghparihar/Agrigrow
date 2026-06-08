# =======================
# 🔥 IMPORTS
# =======================
from flask import Flask, request, jsonify, make_response
import numpy as np
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import json
import datetime
import joblib

# Firebase (UNCHANGED)
import firebase_admin
from firebase_admin import credentials, db

# =======================
# 🔥 INIT APP
# =======================
app = Flask(__name__)
CORS(app)

# =======================
# 🔥 FIREBASE INIT (UNCHANGED)
# =======================
cred = credentials.Certificate("firebase_key.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://agrigrow-50834-default-rtdb.firebaseio.com/'
})

# =======================
# 🔥 LOAD PLANT MODEL
# =======================
try:
    model = load_model("plant_disease_model.h5", compile=False)
    print("✅ Plant Model Loaded")
except Exception as e:
    print("❌ Model Error:", e)
    model = None

# =======================
# 🌾 LOAD CROP MODEL
# =======================
try:
    crop_model = joblib.load("crop_model.pkl")
    print("✅ Crop Model Loaded")
except Exception as e:
    print("❌ Crop Model Error:", e)
    crop_model = None

# =======================
# 📁 LOAD CLASS LABELS
# =======================
try:
    with open("class_labels.json") as f:
        class_indices = json.load(f)

    class_labels = list(class_indices.keys())
    print("📊 Classes Loaded:", len(class_labels))

except Exception as e:
    print("❌ Label Error:", e)
    class_labels = []

# =======================
# 📸 IMAGE PREPROCESS
# =======================
def preprocess(image):
    image = image.resize((224,224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# =======================
# 🌿 HOME
# =======================
@app.route("/")
def home():
    return "AgriGrow Backend Running ✅"

# =======================
# 🌿 PLANT DETECTION ONLY
# =======================
@app.route("/detect-plant", methods=["POST"])
def detect_plant():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        file = request.files["file"]
        image = Image.open(file).convert("RGB")

        img = preprocess(image)

        pred = model.predict(img)
        index = np.argmax(pred)
        confidence = float(pred[0][index]) * 100

        label = class_labels[index]
        plant = label.split("___")[0]

        return jsonify({
            "plant": plant,
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =======================
# 🦠 DISEASE DETECTION
# =======================
@app.route("/detect-disease", methods=["POST"])
def detect_disease():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        file = request.files["file"]
        image = Image.open(file).convert("RGB")

        img = preprocess(image)

        pred = model.predict(img)
        index = np.argmax(pred)
        confidence = float(pred[0][index]) * 100

        label = class_labels[index]
        parts = label.split("___")

        plant = parts[0]
        disease = parts[1]

        return jsonify({
            "plant": plant,
            "disease": disease,
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =======================
# 🌾 CROP RECOMMENDATION
# =======================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        if crop_model is None:
            return jsonify({"error": "Crop model not loaded"}), 500

        data = request.json

        features = np.array([[
            float(data["N"]),
            float(data["P"]),
            float(data["K"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["ph"]),
            float(data["rainfall"])
        ]])

        probs = crop_model.predict_proba(features)[0]
        crops = crop_model.classes_

        results = []
        for i, crop in enumerate(crops):
            results.append({
                "name": crop,
                "confidence": round(probs[i] * 100, 2)
            })

        results = sorted(results, key=lambda x: x["confidence"], reverse=True)[:3]

        return jsonify({"recommendations": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# =======================
# 🚀 RUN
# =======================
if __name__ == "__main__":
    print("🚀 Running on http://localhost:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)