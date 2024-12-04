from pymongo import MongoClient

# MongoDB connection string
MONGO_URI = "mongodb+srv://admin:admin123@cluster0.9ppmds5.mongodb.net/diary_app?retryWrites=true&w=majority"

# Initialize MongoDB client
client = MongoClient(MONGO_URI)

# Select the database and collection
db = client["diary_app"]
diary_collection = db["diary_entries"]
