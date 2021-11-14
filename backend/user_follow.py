import database
import token_helper
import auth_helper
from bson.objectid import ObjectId
from error import AccessError
def user_follow(token, user_id):
    # check if the token is valid and find the user
    users = database.get_users()
    token_helper.is_token_valid(token, users)
    user = users.find_one({"token":token})

    # Validate user
    if not auth_helper.check_user_id(ObjectId(user_id), users):
        raise AccessError(description="User does not exist")

    following = user['following']
    following.append(user_id)
    users.update_one({"_id":user['_id']}, {"$set":{"following":following}})

