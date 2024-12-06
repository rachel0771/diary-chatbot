from flask import Blueprint, request, jsonify
from config import diary_collection  # Import the collection from config.py

diary_routes = Blueprint("diary_routes", __name__)

@diary_routes.route("/", methods=["GET"])
def get_diary_entries():
    """Fetch all diary entries."""
    try:
        entries = list(diary_collection.find({}, {"_id": 0}))  # Exclude the _id field
        return jsonify(entries), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@diary_routes.route("/", methods=["POST"])
def add_diary_entry():
    """Add a new diary entry."""
    try:
        data = request.json
        print(f"Received data for new entry: {data}")  # 添加日志，查看接收到的数据

        if not data.get("content") or not data.get("advantage") or not data.get("person"):
            print("Missing required fields:", data)
            return jsonify({"error": "Missing required fields"}), 400

        diary_collection.insert_one(data)
        print("Successfully added:", data)
        return jsonify({"message": "Diary entry added successfully"}), 201
    except Exception as e:
        print("Error adding diary entry:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500
