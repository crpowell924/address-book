from fastapi import FastAPI, Body, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from bson.objectid import ObjectId
from app.helpers import format_json

app = FastAPI()

# CORS middleware
origins = [ "http://localhost:3000" ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Connection
client = MongoClient("mongodb://user:pass@db:27017/")
db = client.addressbook

@app.get("/addresses")
def list_addresses():
    addresses = db.addresses
    list = []
    for addr in addresses.find():
        addr = format_json(addr)
        list.append(addr)
    return JSONResponse(status_code=status.HTTP_200_OK, content=list)

@app.get("/addresses/{item_id}")
def get_address(item_id: str):
    addresses = db.addresses
    if (address := addresses.find_one({"_id": ObjectId(item_id) })) is not None:
        print(address)
        return JSONResponse(status_code=status.HTTP_200_OK, content=format_json(address))
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Address {item_id} not found")

@app.post("/addresses")
def create_address(address = Body(...)):
    addresses = db.addresses
    new_id = addresses.insert_one(address).inserted_id
    created_address = addresses.find_one({ "_id": new_id })
    print(created_address)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=format_json(created_address))

@app.put("/addresses/{item_id}")
def create_address(item_id: str, address = Body(...)):
    addresses = db.addresses
    filter = { "_id": ObjectId(item_id) }
    newValues = { "$set": address }
    update_result = addresses.update_one(filter, newValues)
    if update_result.modified_count == 1:
        updated_address = addresses.find_one(filter)
        print(updated_address)
        return JSONResponse(status_code=status.HTTP_200_OK, content=format_json(updated_address))
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Address {item_id} not found")

@app.delete("/addresses/{item_id}")
def delete_address(item_id: str):
    addresses = db.addresses
    address = addresses.delete_one({"_id": ObjectId(item_id) })
    if (address.deleted_count == 1):
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, detail=f"Address {item_id} not found")