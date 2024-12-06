from flask import Blueprint, request, jsonify
from config import diary_collection  # Import the collection from config.py
import random

chatbot_routes = Blueprint("chatbot_routes", __name__)

@chatbot_routes.route("/", methods=["POST"])
def get_motivational_message():
    """Generate a motivational message based on diary advantages."""
    try:
        data = request.json
        message = data.get("message", "").lower()

        if message == "hello":
            entries = list(diary_collection.find({}, {"advantage": 1, "_id": 0}))
            if entries:
                advantage = random.choice(entries)["advantage"]
                return jsonify({"response": f"You are a {advantage} person."}), 200
            else:
                return jsonify({"response": "No diary entries available to generate a message."}), 200
        return jsonify({"response": "Please say 'hello' to get a motivational message."}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
