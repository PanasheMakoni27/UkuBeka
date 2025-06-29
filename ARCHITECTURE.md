# Ukubeka Multilingual Translation App Architecture

![Ukubeka Architecture Diagram](./architecture.png)

## Overview
Ukubeka is a web-based system for real-time recognition and translation of South African Sign Language (SASL) gestures using hand landmarks from a webcam feed. The system is designed to be multilingual and user-friendly, supporting gesture recognition, translation, and user customization.

## Architecture Components

### 1. Frontend (React + Tailwind CSS)
- **Pages & Components:**
  - Camera settings, gesture dictionary, favorites, and settings pages.
  - Real-time webcam feed and UI controls.
- **Technologies:**
  - React (JSX), Tailwind CSS for styling.
  - Uses MediaPipe Hands for hand landmark detection in-browser.
  - Communicates with backend via HTTP (fetch/AJAX).

### 2. Backend (Python Flask)
- **API Endpoints:**
  - Receives hand landmark data from frontend.
  - Runs gesture classification using a trained ML model.
  - Returns recognized gesture and translation.
- **Technologies:**
  - Flask for API routing.
  - Machine learning model for gesture recognition (trained with `train_gesture_classifier.py`).

### 3. Data & Models
- **Data:**
  - `gesture_landmarks.json` for training data.
  - `gesture_translations.json` for mapping gestures to translations.
- **Models:**
  - Trained gesture classifier (saved in `static/models/`).

### 4. Static & Template Files
- **Static:**
  - CSS, model files, and other assets in `static/`.
- **Templates:**
  - HTML templates in `templates/` for Flask rendering.

## Data Flow
1. User interacts with the web UI and webcam feed.
2. Hand landmarks are detected in-browser and sent to the Flask backend.
3. Backend classifies the gesture and returns the result.
4. Frontend displays the recognized gesture and translation.

## Extensibility
- Easily add new gestures and translations by updating the JSON files and retraining the model.
- UI and backend are modular for future feature additions.

---

*For more details, see the README.md and code comments in each module.*
