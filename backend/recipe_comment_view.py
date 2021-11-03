import database
from bson.objectid import ObjectId

def recipe_comment_view(recipe_id):
    recipes = database.get_recipes()
    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})
    ret = recipe['comment']

    return {
        'comments': ret,
    }