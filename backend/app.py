from flask import Flask
from flask_cors import CORS
from routes.chatbot_routes import chatbot_routes

import os
port = int(os.getenv("PORT", 5000))  # Default to 5000 if PORT is not set
app.run(host='0.0.0.0', port=port)


app = Flask(__name__)
# Enable requests whiout limitations
CORS(app, resources={r"/*": {"origins": "*"}})

# Register the chatbot routes
app.register_blueprint(chatbot_routes, url_prefix="/chatbot")

if __name__ == "__main__":
    app.run(debug=True)
