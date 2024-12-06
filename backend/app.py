from flask import Flask
from flask_cors import CORS
from routes.chatbot_routes import chatbot_routes

app = Flask(__name__)
# Enable requests whiout limitations
CORS(app, resources={r"/*": {"origins": "*"}})

# Register the chatbot routes
app.register_blueprint(chatbot_routes, url_prefix="/chatbot")

if __name__ == "__main__":
    app.run(debug=True)
