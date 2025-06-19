# South African Sign Language Gesture Recognition

This project is a web-based system for real-time recognition of South African Sign Language (SASL) gestures using hand landmarks from a webcam feed. It uses MediaPipe Hands in the browser, a Python Flask backend, and a machine learning model for gesture classification.

## Features
- Live webcam hand tracking in the browser
- Real-time gesture recognition using a trained model
- Voice output of recognized gestures for accessibility
- Responsive web interface for desktop and mobile

## Project Structure
```
app.py                  # Flask backend
train_gesture_model.py  # Model training script
static/                 # CSS and static assets
    style.css
templates/              # HTML templates
    index.html
```

## Setup Instructions

### 1. Environment Setup
- Install Python 3.8+
- (Recommended) Create a virtual environment:
  ```sh
  python -m venv venv
  venv\Scripts\activate  # On Windows
  source venv/bin/activate  # On macOS/Linux
  ```
- Install dependencies:
  ```sh
  pip install flask scikit-learn numpy joblib
  ```

### 2. Running the Application
- Start the Flask server:
  ```sh
  python app.py
  ```
- Open your browser and go to [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

## Data Collection & Model Training

This section outlines how to collect gesture data using a webcam, train a machine learning model for hand gesture recognition, and test the prediction endpoint in the Flask application.

### 1. Collecting Gesture Data
Use the `collect_hand_landmarks.py` script to capture labeled hand landmark data from a webcam. This script utilizes MediaPipe Hands to extract 21 landmark points from the hand.

**How to run:**
```sh
python collect_hand_landmarks.py
```

**Instructions:**
- You will be prompted to collect samples for each gesture in the predefined list (e.g., Hello, Thank you, Yes, No, Please).
- Ensure your hand is clearly visible in the webcam frame.
- Press `SPACE` to capture a sample.
- Press `ESC` to complete the current gesture and move to the next.
- Press `Q` at any time to quit the session.

All captured data is saved to `data/gesture_landmarks.json` in the following format:
```json
{
  "landmarks": [[x1, y1, z1], [x2, y2, z2], ..., [x21, y21, z21]],
  "label": "GestureName",
  "timestamp": 1729372800.0
}
```
Each sample consists of 21 (x, y, z) hand landmark coordinates and a gesture label.

### 2. Training the Gesture Classification Model
Once you have collected sufficient gesture samples, run the `train_gesture_classifier.py` script to train the model. The script uses a Random Forest classifier and evaluates its performance using a train-test split.

**How to run:**
```sh
python train_gesture_classifier.py
```

**Output:**
- Trained model saved to: `static/models/gesture_model.pkl`
- Label mapping saved to: `static/models/gesture_labels.pkl`
- The script also prints the classification report to the console, including precision, recall, and F1-score.

### 3. Testing the /predict API Route
After training the model, you can test the `/predict` API endpoint by sending landmark data in the same format as the collected samples.

**Request:**
- Method: POST
- URL: `/predict`
- Content-Type: `application/json`
- Body format:
```json
{
  "hands": [
    [[x1, y1, z1], ..., [x21, y21, z21]]
  ]
}
```

**Response:**
```json
{
  "prediction": "PredictedGestureLabel"
}
```
You can test this endpoint using a frontend form, JavaScript fetch request, Postman, or curl.

### 4. Example Workflow
```sh
# Step 1: Collect gesture data
python collect_hand_landmarks.py

# Step 2: Train the model
python train_gesture_classifier.py

# Step 3: Start the Flask server
python app.py

# Step 4: Open the web app at http://localhost:5000
# Step 5: Use your webcam to test live gesture recognition
```

### 5. Best Practices
- Collect at least 30–50 samples per gesture for initial training.
- Capture gestures from different angles, distances, and lighting conditions.
- Ensure a plain background when possible for more accurate detection.
- Extend the list of gestures by modifying the array in `collect_hand_landmarks.py`.

## Sample Data Structure: gesture_landmarks.json

This is what one sample entry in your training data will look like:

```json
{
  "landmarks": [
    [0.123, 0.456, 0.001],
    [0.234, 0.567, 0.002],
    [0.345, 0.678, 0.003],
    [0.456, 0.789, 0.004],
    [0.567, 0.890, 0.005],
    [0.678, 0.901, 0.006],
    [0.789, 0.012, 0.007],
    [0.890, 0.123, 0.008],
    [0.901, 0.234, 0.009],
    [0.012, 0.345, 0.010],
    [0.123, 0.456, 0.011],
    [0.234, 0.567, 0.012],
    [0.345, 0.678, 0.013],
    [0.456, 0.789, 0.014],
    [0.567, 0.890, 0.015],
    [0.678, 0.901, 0.016],
    [0.789, 0.012, 0.017],
    [0.890, 0.123, 0.018],
    [0.901, 0.234, 0.019],
    [0.012, 0.345, 0.020],
    [0.123, 0.456, 0.021]
  ],
  "label": "Hello",
  "timestamp": "2025-06-19T12:00:00"
}
```
Each entry contains 21 (x, y, z) hand landmark coordinates, a gesture label, and a timestamp.

## Usage
- The web app will use your webcam to detect hands and recognize gestures in real time.
- Recognized gestures are displayed and spoken aloud for accessibility.
- The backend can be extended to support more gestures or custom logic.

## Notes
- Ensure your browser allows webcam access.
- For best results, collect a diverse dataset for each gesture.
- The model and backend can be retrained and improved as needed.

## License
MIT License
