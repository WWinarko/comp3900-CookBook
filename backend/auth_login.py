import argument_checker
import auth_helper
import encryption_helper
import database
from error import InputError

def auth_login(username, password):
    ''' Log in a user '''
    users = database.get_users()

    # check if both field have arguments
    argument_checker.all_not_empty([username, password])
    
    # check if the username exists
    if not auth_helper.check_user_name(username, users):
        raise InputError(description="Username does not exist")

    user = users.find_one({"username":username})
    # check if the password is correct
    if user['password'] != encryption_helper.hash_password(password):
        raise InputError(description="Incorrect Password")

    user_id = str(user['_id'])
    token = encryption_helper.generate_token()
    users.update_one({"_id": user['_id']}, {"$set": {"token": token}})

    # return user_id and token
    return {
        'user_id': user_id,
        'token': token
    }

auth_login("TrinaChang", "abcdefgh")
auth_login("JennaChan", "iamsougly")