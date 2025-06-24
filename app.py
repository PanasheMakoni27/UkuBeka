from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import os
import traceback
import json

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
    try:
        data = request.get_json(force=True, silent=True)
        if data is None or 'hands' not in data or not isinstance(data['hands'], list) or not data['hands']:
            return jsonify({'error': 'Invalid input: JSON body must contain a non-empty "hands" list.'}), 400
        landmarks = data['hands'][0]
        if not isinstance(landmarks, list) or len(landmarks) != 21:
            return jsonify({'error': 'Each hand must have 21 landmark points.'}), 400
        flat = []
        for lm in landmarks:
            if not (isinstance(lm, dict) and all(k in lm for k in ('x', 'y', 'z'))):
                return jsonify({'error': 'Each landmark must be a dict with x, y, z.'}), 400
            flat.extend([lm['x'], lm['y'], lm['z']])
        X = np.array(flat).reshape(1, -1)
        model_path = os.path.join('static', 'models', 'gesture_model.pkl')
        label_map_path = os.path.join('static', 'models', 'gesture_labels.pkl')
        try:
            model = joblib.load(model_path)
            label_map = joblib.load(label_map_path)
        except Exception as model_err:
            traceback.print_exc()
            return jsonify({'error': f'Model or label map load error: {str(model_err)}'}), 500
        pred_idx = model.predict(X)[0]
        if isinstance(label_map, dict):
            pred_label = label_map.get(pred_idx, str(pred_idx))
        else:
            pred_label = str(pred_idx)
        return jsonify({'prediction': pred_label})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/get_translations')
def get_translations():
    lang = request.args.get('lang', 'en')
    with open('gesture_translations.json', 'r', encoding='utf-8') as f:
        all_translations = json.load(f)
    # Build a dict of gesture_key: translation for the requested language, fallback to English
    translations = {}
    for gesture, langs in all_translations.items():
        translations[gesture] = langs.get(lang) or langs.get('en') or gesture
    return jsonify(translations)

if __name__ == '__main__':
    app.run(debug=True)
