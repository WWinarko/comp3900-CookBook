import database
from bson.objectid import ObjectId

def user_listfollow(user_id):
    users = database.get_users()
    user = users.find_one({"_id":ObjectId(user_id)})

    return {
        "following":user['following']
    }
