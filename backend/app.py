from flask import Flask
from flask_cors import CORS
from routes.diary_routes import diary_routes
from routes.chatbot_routes import chatbot_routes

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Register blueprints
app.register_blueprint(diary_routes, url_prefix="/diary")
app.register_blueprint(chatbot_routes, url_prefix="/chatbot")

@app.route("/")
def home():
    return "Welcome to the Diary Chatbot API!"

if __name__ == "__main__":
    import os
    port = int(os.getenv("PORT", 5050))
    app.run(host="0.0.0.0", port=port, debug=True)
