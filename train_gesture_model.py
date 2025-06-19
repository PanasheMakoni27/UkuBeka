import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

# Load labeled data (assume JSON: [{"landmarks": [[x, y, z], ...], "label": "gesture_name"}, ...])
with open('gesture_landmarks.json', 'r') as f:
    data = json.load(f)

X = []
y = []
for item in data:
    # Flatten 21 landmarks (x, y, z) into a single vector
    flat = []
    for lm in item['landmarks']:
        flat.extend(lm)
    X.append(flat)
    y.append(item['label'])

X = np.array(X)
y = np.array(y)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Evaluate
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred))

# Save model
joblib.dump(clf, 'gesture_model.pkl')
print('Model saved as gesture_model.pkl')
