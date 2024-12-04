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

        # 数据验证
        if not isinstance(data.get("content"), str) or len(data["content"].strip()) == 0:
            return jsonify({"error": "Invalid content"}), 400
        if not isinstance(data.get("advantage"), str) or len(data["advantage"].strip()) == 0:
            return jsonify({"error": "Invalid advantage"}), 400
        if not isinstance(data.get("person"), str) or len(data["person"].strip()) == 0:
            return jsonify({"error": "Invalid person"}), 400

        # 插入到 MongoDB
        diary_collection.insert_one(data)
        return jsonify({"message": "Diary entry added successfully"}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
