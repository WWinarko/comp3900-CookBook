import database
from bson.objectid import ObjectId

def recipe_comment_view(recipe_id):
    ''' view comment of the givenn comment_id '''
    recipes = database.get_recipes()
    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})

    return {
        "comments":recipe['comment']
    }