from flask import Blueprint, request, jsonify
from config import diary_collection  # Import the collection from config.py
import random

chatbot_routes = Blueprint("chatbot_routes", __name__)

@chatbot_routes.route("/", methods=["POST"])
def get_motivational_message():
    """Generate a motivational message based on diary advantages."""
    try:
        # Log the received request data
        data = request.json
        print(f"Received message: {data}")

        # Validate the request content
        if not data or "message" not in data:
            print("Invalid request, missing 'message'")
            return jsonify({"response": "Invalid request, please include a 'message' field."}), 400

        message = data.get("message", "").lower()

        if message == "hello":
            # Fetch all advantages from the diary entries
            entries = list(diary_collection.find({}, {"advantage": 1, "_id": 0}))
            if entries:
                # Randomly pick an advantage and send it back as a response
                advantage = random.choice(entries)["advantage"]
                print(f"Sending motivational message with advantage: {advantage}")
                return jsonify({"response": f"You are a {advantage} person."}), 200
            else:
                print("No diary entries available to generate a message.")
                return jsonify({"response": "No diary entries available to generate a message."}), 200
        else:
            print("Invalid message content. Expecting 'hello'.")
            return jsonify({"response": "Please say 'hello' to get a motivational message."}), 200

    except Exception as e:
        # Print error and return a generic response
        print("Error generating motivational message:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500
