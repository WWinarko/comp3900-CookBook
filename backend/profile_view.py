from error import AccessError
from token_helper import find_user_id_from_token
import database
import token_helper
import recipe_helper
import auth_helper
from bson.objectid import ObjectId

def profile_view(token, user_id):
    ''' View a profile '''
    users = database.get_users()
    user_id_new = ObjectId(user_id)

    # Validate token
    token_helper.is_token_valid(token, users)

    # Validate user
    if not auth_helper.check_user_id(user_id_new, users):
        raise AccessError(description="User does not exist")

    # User info
    user = users.find_one({"_id":user_id_new})
    
    username = user['username']
    first_name = user['first_name']
    last_name = user['last_name']
    email = ""
    phone = ""
    follower = user['follower']
    photo = user['photo']

    # Check if viewing own profile
    if token_helper.find_user_id_from_token(token, users) == user['_id']:
        email = user['email']
        phone = user['phone']

    # User recipes
    user_recipes_string = []
    recipes = database.get_recipes()
    user_recipes = recipes.find({"owner_id":user_id_new})
    for recipe in user_recipes:
        user_recipes_string.append({"_id": recipe['_id']})

    return {
        'username': username,
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'phone': phone,
        'follower': follower,
        'photo': photo,
        'user_recipes_string': user_recipes_string
    }