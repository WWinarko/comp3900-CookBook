import database
import token_helper
from bson.objectid import ObjectId
import datetime

def recipe_comment(token, comment, rating, recipe_id):
    ''' comment on a recipe '''
    users = database.get_users()
    recipes = database.get_recipes()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Get the comment user
    user = users.find_one({"token":token})
    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})

    time = datetime.datetime.strftime(datetime.datetime.now(), "%d/%m/%Y %H:%M"), 

    # Username and comment will be displayed and id is for reference
    comment_added = (user['_id'], user['username'], rating, comment, time)

    # append to the comment list
    comments = recipe['comment']
    recipe['comment'] = comments.append(comment_added)
    
    recipes.update_one({"_id":ObjectId(recipe_id)}, {"$set": {"comment":recipe['comment']}})