from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask backend is running!"

@app.route("/get-response")
def message():
    return jsonify({"message": "Hello from Flask backend from route /get-response!"})

# Updated POST API with validation and dynamic handling
@app.route("/send-data", methods=["POST"])
def send_data():
    data = request.get_json()  # get JSON payload from frontend
    print("Received POST:", data) 
    if not data:
        return jsonify({"message": "No JSON payload received", "status": "error"}), 400

    name = data.get("name")
    age = data.get("age")

    # Validate input
    if not name or not age:
        return jsonify({"message": "Both name and age are required", "status": "error"}), 400

    # Optional: further type check for age
    try:
        age = int(age)
    except ValueError:
        return jsonify({"message": "Age must be a number", "status": "error"}), 400

    # Process the data and return dynamic response
    response = {
        "message": f"Received data for {name}, age {age}",
        "status": "success"
    }
    return jsonify(response), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
