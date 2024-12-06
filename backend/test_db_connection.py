from pymongo import MongoClient

# MongoDB Atlas connecting strings
MONGO_URI = "mongodb+srv://admin:admin123@cluster0.9ppmds5.mongodb.net/diary_app?retryWrites=true&w=majority"

# initialize mongodb
client = MongoClient(MONGO_URI)

# selecting data collection
db = client["diary_app"]
diary_collection = db["diary_entries"]

# search data
try:
    documents = list(diary_collection.find({}, {"_id": 0}))  # not return id strings
    print("Sample Data from MongoDB:")
    for doc in documents:
        print(doc)
except Exception as e:
    print("Error connecting to MongoDB:", e)
