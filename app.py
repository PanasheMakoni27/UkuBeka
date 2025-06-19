from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/hand_landmarks', methods=['POST'])
def hand_landmarks():
    data = request.get_json()
    # Example: just echo back the number of hands detected
    num_hands = len(data.get('hands', []))
    return jsonify({'result': f'{num_hands} hand(s) detected and data received.'})

@app.route('/predict_gesture', methods=['POST'])
def predict_gesture():
    data = request.get_json()
    hands = data.get('hands', [])
    if not hands:
        return jsonify({'prediction': None, 'error': 'No hand landmarks provided.'}), 400
    # Only predict for the first hand in the list
    landmarks = hands[0]
    # Flatten 21 landmarks (x, y, z) into a single vector
    flat = []
    for lm in landmarks:
        flat.extend([lm['x'], lm['y'], lm['z']])
    X = np.array(flat).reshape(1, -1)
    # Load model
    try:
        model = joblib.load('gesture_model.pkl')
    except Exception as e:
        return jsonify({'prediction': None, 'error': f'Model load error: {str(e)}'}), 500
    # Predict
    pred = model.predict(X)[0]
    return jsonify({'prediction': pred})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    hands = data.get('hands', [])
    if not hands:
        return jsonify({'prediction': None, 'error': 'No hand landmarks provided.'}), 400
    # Only predict for the first hand in the list
    landmarks = hands[0]
    # Flatten 21 landmarks (x, y, z) into a single vector
    flat = []
    for lm in landmarks:
        flat.extend([lm['x'], lm['y'], lm['z']])
    X = np.array(flat).reshape(1, -1)
    # Load model and label map
    model_path = os.path.join('static', 'models', 'gesture_model.pkl')
    label_map_path = os.path.join('static', 'models', 'gesture_labels.pkl')
    try:
        model = joblib.load(model_path)
        label_map = joblib.load(label_map_path)
    except Exception as e:
        return jsonify({'prediction': None, 'error': f'Model or label map load error: {str(e)}'}), 500
    # Predict
    pred_idx = model.predict(X)[0]
    # If label_map is a dict mapping index to label, get label
    if isinstance(label_map, dict):
        pred_label = label_map.get(pred_idx, str(pred_idx))
    else:
        pred_label = str(pred_idx)
    return jsonify({'prediction': pred_label})

if __name__ == '__main__':
    app.run(debug=True)
