import token_helper
import database
from bson.objectid import ObjectId

def recommendation_history(token):
    ''' recommend based on user's account history '''
    users = database.get_users()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Get the current user
    user = users.find_one({"token":token})
    recipes = database.get_recipes()

    recipe_bought = user['recipe_bought']
    point_assign = dict()

    for recipe_id in recipe_bought:
        recipe = recipes.find_one({"_id":ObjectId(recipe_id)})
        for label in recipe['label']:
            point_assign[label] = point_assign.get(label, 0) + 1

    rank_recipe = []
    for recipe_id in recipes:
        recipe = recipes.find_one({"_id":ObjectId(recipe_id)})
        point = 0
        for label in recipe['label']:
            point += point_assign.get(label, 0)

        rank_recipe.append(point, recipe_id)
    rank_recipe.sort(key=lambda x:x[0])

    final_recipe = []
    for recipe in rank_recipe:
        (point, id) = recipe
        if not id in recipe_bought:
            final_recipe.append(recipe)
    
    return {
        "recipe_ids":final_recipe
    }