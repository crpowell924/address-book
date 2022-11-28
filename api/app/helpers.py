import json
import bson.json_util as json_util

def format_json(data):
    data = json.loads(json_util.dumps(data))
    data["_id"] = data["_id"]["$oid"]
    return data