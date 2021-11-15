import database
import token_helper

def user_edit(token, first_name, last_name, photo, email, address, state, postcode, phone):
    # check if the token is valid and find the user
    users = database.get_users()
    token_helper.is_token_valid(token, users)
    user = users.find_one({"token":token})

    users.update_one({"token":token}, {"$set": {"first_name":first_name}})
    users.update_one({"token":token}, {"$set": {"last_name":last_name}})
    users.update_one({"token":token}, {"$set": {"photo":photo}})
    users.update_one({"token":token}, {"$set": {"email":email}})
    users.update_one({"token":token}, {"$set": {"address":address}})
    users.update_one({"token":token}, {"$set": {"state":state}})
    users.update_one({"token":token}, {"$set": {"postcode":postcode}})
    users.update_one({"token":token}, {"$set": {"phone":phone}})

    return {
        "user_id":str(user['_id'])
    }