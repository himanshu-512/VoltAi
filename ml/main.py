from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.responses import JSONResponse

app = FastAPI()

# ✅ 1. MongoDB Connection
client = MongoClient("mongodb+srv://ht934715:123@cluster0.j75kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["Chatapp"]  # ✅ Make sure this matches your DB name
collection = db["sensordatas"]  # ✅ Your collection name

# ✅ 2. FastAPI Route
@app.get("/hello")
async def get_data():
    data = list(collection.find({}, {"_id": 0}))  # Ignore _id
    return JSONResponse(content={"data": data})