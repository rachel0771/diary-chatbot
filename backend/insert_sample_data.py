from pymongo import MongoClient

# connect to MongoDB
MONGO_URI = "mongodb+srv://admin:admin123@cluster0.9ppmds5.mongodb.net/diary_app?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client["diary_app"]
diary_collection = db["diary_entries"]

# insert sample data
sample_data = [
    {"content": "You did a great job on the project presentation.", "advantage": "Confident", "person": "Alex"},
    {"content": "Your kindness to help others is inspiring.", "advantage": "Kind", "person": "Taylor"},
    {"content": "You showed incredible patience and determination.", "advantage": "Patient", "person": "Jordan"},
    {"content": "Your creativity in designing the new layout was amazing.", "advantage": "Creative", "person": "Sam"}
]

diary_collection.insert_many(sample_data)
print("Sample data added successfully!")
