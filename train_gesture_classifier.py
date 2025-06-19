import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib
import os
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import precision_recall_fscore_support

# Load labeled data from data/gesture_landmarks.json
filename = os.path.join('data', 'gesture_landmarks.json')
with open(filename, 'r') as f:
    data = json.load(f)

X = []
y = []
for item in data:
    # Flatten 21 landmarks (x, y, z) into a single vector (63 values)
    flat = []
    for lm in item['landmarks']:
        flat.extend(lm)
    X.append(flat)
    y.append(item['label'])

X = np.array(X)
y = np.array(y)

print(f"Loaded {len(X)} samples.")
print(f"Number of unique gestures: {len(set(y))}")
print(f"Number of features per sample: {X.shape[1]}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Evaluate
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred))

# Show precision, recall, F1-score summary
precision, recall, f1, _ = precision_recall_fscore_support(y_test, y_pred, average='weighted', zero_division=0)
print(f"\nWeighted Precision: {precision:.3f}")
print(f"Weighted Recall:    {recall:.3f}")
print(f"Weighted F1-score:  {f1:.3f}")

# Save model and label map
os.makedirs('static/models', exist_ok=True)
joblib.dump(clf, 'static/models/gesture_model.pkl')

# Save label map (class indices to labels)
le = LabelEncoder()
le.fit(y)
label_map = {i: label for i, label in enumerate(le.classes_)}
joblib.dump(label_map, 'static/models/gesture_labels.pkl')
print('Model saved as static/models/gesture_model.pkl')
print('Label map saved as static/models/gesture_labels.pkl')
