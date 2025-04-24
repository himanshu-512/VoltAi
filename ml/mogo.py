from pymongo import MongoClient



# 1. Connect to MongoDB
client = MongoClient("mongodb+srv://ht934715:123@cluster0.j75kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["smart_energy"]
collection = db["sensor_data"]

# 2. Get Data
data = list(collection.find({}, {"_id": 0}))
print(data)