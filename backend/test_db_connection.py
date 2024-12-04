from pymongo import MongoClient

# MongoDB Atlas 连接字符串（替换 <username> 和 <password>）
MONGO_URI = "mongodb+srv://admin:admin123@cluster0.9ppmds5.mongodb.net/diary_app?retryWrites=true&w=majority"

# 初始化 MongoDB 客户端
client = MongoClient(MONGO_URI)

# 选择数据库和集合
db = client["diary_app"]
diary_collection = db["diary_entries"]

# 查询所有数据
try:
    documents = list(diary_collection.find({}, {"_id": 0}))  # 不返回 _id 字段
    print("Sample Data from MongoDB:")
    for doc in documents:
        print(doc)
except Exception as e:
    print("Error connecting to MongoDB:", e)
