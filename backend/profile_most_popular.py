import database
from bson.objectid import ObjectId
from error import AccessError
import auth_helper

def profile_most_popular(user_id):
    users = database.get_users()

    # Validate user
    if not auth_helper.check_user_id(ObjectId(user_id), users):
        raise AccessError(description="User does not exist")

    # User recipes
    recipes = database.get_recipes()
    user_recipes = recipes.find({"owner_id":user_id})
    max_rating = 0
    popular_recipe = None
    for recipe in user_recipes:
        rating = 0
        counter = 0
        for comment in recipe['comment']:
            rating += int(comment['rating'])
            counter += 1
        if counter == 0:
            rating = 0
        else:
            rating = rating/counter
        
        if rating >= max_rating:
            max_rating = rating
            popular_recipe = recipe
    if popular_recipe == None:
        recipe_id = None
    else:
        recipe_id = str(popular_recipe['_id'])
    return {
        "recipe_id":recipe_id
    }

    