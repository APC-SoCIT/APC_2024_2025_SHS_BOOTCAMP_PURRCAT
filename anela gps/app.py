from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MAPBOX_TOKEN = 'pk.eyJ1Ijoia3dpeW8iLCJhIjoiY21iZWh5eWJnMWM5eDJrb2V3a2c0cXdxaiJ9.7lGoFf0nvIBawZaWayGvgg'  # ← Replace with your token

@app.route('/get_eta', methods=['POST'])
def get_eta():
    data = request.get_json()
    origin = data.get('origin')  # [lng, lat]
    destination = data.get('destination')  # [lng, lat]

    url = f"https://api.mapbox.com/directions/v5/mapbox/driving/" \
          f"{origin[0]},{origin[1]};{destination[0]},{destination[1]}" \
          f"?access_token={MAPBOX_TOKEN}&overview=false"

    res = requests.get(url)
    info = res.json()

    if info['routes']:
        duration = info['routes'][0]['duration']  # in seconds
        distance = info['routes'][0]['distance']  # in meters
        return jsonify({
            'eta_minutes': round(duration / 60, 1),
            'distance_km': round(distance / 1000, 2)
        })
    else:
        return jsonify({'error': 'Route not found'}), 400

if __name__ == '__main__':
    app.run(debug=True)