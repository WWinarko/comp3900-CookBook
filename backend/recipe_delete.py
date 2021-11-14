import database
import token_helper
from error import AccessError
from bson.objectid import ObjectId

def recipe_delete(token, recipe_id):
    ''' delete a recipe '''
    users = database.get_users()
    recipes = database.get_recipes()

    # check if the token is valid
    token_helper.is_token_valid(token, users)

    user = users.find_one({"token":token})
    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})

    # Check if the user has permission
    if not (token_helper.check_admin(token, users) or recipe['owner_id'] == str(user['_id'])):
        raise AccessError(description="user does not have permission")

    recipes.delete_one({"_id":ObjectId(recipe_id)})