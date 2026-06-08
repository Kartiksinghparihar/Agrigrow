import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import json

# =======================
# 📁 DATASET PATH
# =======================
DATASET_PATH = r"C:\Users\karti\Downloads\archive (2)\plantvillage dataset\color"

# =======================
# ⚡ ADVANCED DATA AUGMENTATION (KEY FOR ACCURACY)
# =======================
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=25,
    zoom_range=0.25,
    shear_range=0.2,
    horizontal_flip=True,
    brightness_range=[0.7, 1.3]
)

train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224,224),
    batch_size=32,
    class_mode="categorical",
    subset="training"
)

val_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224,224),
    batch_size=32,
    class_mode="categorical",
    subset="validation"
)

print("Classes:", train_data.num_classes)

# =======================
# 💾 SAVE LABELS (IMPORTANT FIX)
# =======================
with open("class_labels.json", "w") as f:
    json.dump(train_data.class_indices, f)

# =======================
# 🚀 MODEL (IMPROVED)
# =======================
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224,224,3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False

x = base_model.output
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.BatchNormalization()(x)   # 🔥 NEW
x = tf.keras.layers.Dense(256, activation="relu")(x)  # 🔥 bigger layer
x = tf.keras.layers.Dropout(0.5)(x)           # 🔥 prevents overfitting
output = tf.keras.layers.Dense(train_data.num_classes, activation="softmax")(x)

model = tf.keras.Model(inputs=base_model.input, outputs=output)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# =======================
# ⚡ TRAINING (PHASE 1)
# =======================
model.fit(
    train_data,
    validation_data=val_data,
    epochs=5,
    steps_per_epoch=300,
    validation_steps=80
)

# =======================
# 🔥 FINE-TUNING (CRITICAL FOR ACCURACY)
# =======================
base_model.trainable = True

# Freeze first layers, train deeper layers only
for layer in base_model.layers[:100]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

model.fit(
    train_data,
    validation_data=val_data,
    epochs=5,
    steps_per_epoch=300,
    validation_steps=80
)

# =======================
# 💾 SAVE FINAL MODEL
# =======================
model.save("plant_disease_model.h5")

print("✅ High accuracy model trained!")