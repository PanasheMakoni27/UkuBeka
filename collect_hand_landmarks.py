import cv2
import mediapipe as mp
import json
import os
import time

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

def main():
    gesture_list = ["Hello", "Thank you", "Yes", "No", "Please"]
    print("Hand Landmark Data Collection CLI")
    print("Gestures to collect:", ", ".join(gesture_list))
    for gesture_label in gesture_list:
        input(f"\nPress ENTER to start collecting samples for gesture: '{gesture_label}' (30 samples)...")
        samples = []
        cap = cv2.VideoCapture(0)
        with mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.7) as hands:
            print("Press SPACE to capture, ESC to finish gesture early, Q to quit.")
            sample_count = 0
            while cap.isOpened() and sample_count < 30:
                ret, frame = cap.read()
                if not ret:
                    break
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = hands.process(image)
                image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
                if results.multi_hand_landmarks:
                    for hand_landmarks in results.multi_hand_landmarks:
                        mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                cv2.putText(image, f'Label: {gesture_label}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
                cv2.putText(image, f'Sample: {sample_count+1}/30', (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)
                cv2.imshow('Hand Landmark Collector', image)
                key = cv2.waitKey(1) & 0xFF
                if key == ord(' '):
                    if results.multi_hand_landmarks:
                        for hand_landmarks in results.multi_hand_landmarks:
                            landmarks = [[lm.x, lm.y, lm.z] for lm in hand_landmarks.landmark]
                            samples.append({'landmarks': landmarks, 'label': gesture_label})
                            sample_count += 1
                            print(f"Sample captured. Total: {sample_count}/30")
                            if sample_count >= 30:
                                print(f"Collected 30 samples for '{gesture_label}'.")
                                break
                elif key == 27:  # ESC
                    print(f"Finished gesture '{gesture_label}' early with {sample_count} samples.")
                    break
                elif key == ord('q'):
                    print("Quitting.")
                    cap.release()
                    cv2.destroyAllWindows()
                    save_samples(samples)
                    return
            cap.release()
            cv2.destroyAllWindows()
            save_samples(samples)
    print("\nAll gestures completed.")

def save_samples(samples):
    if not samples:
        print("No samples to save.")
        return
    os.makedirs('data', exist_ok=True)
    filename = os.path.join('data', 'gesture_landmarks.json')
    # Add timestamp to each sample
    for sample in samples:
        sample['timestamp'] = time.time()
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            existing = json.load(f)
    else:
        existing = []
    existing.extend(samples)
    with open(filename, 'w') as f:
        json.dump(existing, f, indent=2)
    print(f"Saved {len(samples)} samples to {filename}.")

if __name__ == '__main__':
    main()
