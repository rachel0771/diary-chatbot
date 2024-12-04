from flask import Flask
from flask_cors import CORS
from routes.diary_routes import diary_routes
from routes.chatbot_routes import chatbot_routes

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Register blueprints
app.register_blueprint(diary_routes, url_prefix="/diary")
app.register_blueprint(chatbot_routes, url_prefix="/chatbot")

@app.route("/test-db", methods=["GET"])
def test_db():
    """Test connection to MongoDB."""
    from config import diary_collection  # Import here to ensure it's defined
    try:
        doc = diary_collection.find_one()
        return {"status": "success", "doc": doc}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

if __name__ == "__main__":
    app.run(debug=True)
