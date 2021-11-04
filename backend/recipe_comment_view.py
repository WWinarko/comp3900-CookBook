import database
from bson.objectid import ObjectId

def recipe_comment_view(recipe_id):
    ''' view comment of the given comment_id '''
    recipes = database.get_recipes()
    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})

    return {
        "comments":recipe['comment']
    }

# recipe_comment_view("61822a0c5ac1298dfea87153")