from backend.error import AccessError
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
    if not auth_helper.check_user_id(user_id, users):
        raise AccessError(description="User does not exist")

    # User info
    user = users.find_one({"_id":user_id_new})
    
    username = user['username']
    first_name = user['first_name']
    last_name = user['last_name']
    email = ""
    address = ""
    state = ""
    postcode = ""
    phone = ""
    follower = user['follower']
    photo = user['photo']

    # If viewing own profile
    email = user['email']
    address = user['address']
    state = user['state']
    postcode = user['postcode']
    phone = user['phone']

    # User recipes
    user_recipes_string = []
    recipes = database.get_recipes()
    user_recipes = recipes.find({"owner_id":user_id_new})
    for recipe in user_recipes:
        user_recipes_string.append({recipe['title'], recipe['photo'], recipe['difficulty'], recipe['rating'], })

    return {
        'username': username,
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'address': address,
        'state': state,
        'postcode': postcode,
        'phone': phone,
        'follower': follower,
        'photo': photo,
        'user_recipes_string': user_recipes_string
    }