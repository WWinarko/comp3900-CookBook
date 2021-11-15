import token_helper
import database
from bson.objectid import ObjectId

def recommendation_history(token):
    ''' recommend based on user's account history '''
    # Retrieve data from the database
    users = database.get_users()
    recipes = database.get_recipes()
    
    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Get the current user
    user = users.find_one({"token":token})

    recipe_bought = user['recipe_bought']
    point_assign = dict()

    # Count how many time each label appear 
    for recipe_id in recipe_bought:
        recipe = recipes.find_one({"_id":ObjectId(recipe_id)})
        for label in recipe['labels']:
            point_assign[label] = point_assign.get(label, 0) + 1

    recipe_list = list(recipes.find())
    rank_recipe = []

    # Calculate the average rating
    whole_counter = 0
    whole_rating = 0
    for recipe in recipe_list:
        rating = 0
        counter = 0
        for comment in recipe['comment']:
            rating += int(comment['rating'])
            counter += 1
        if counter != 0:
            whole_rating += rating
            whole_counter += 1
    if whole_counter != 0:
        whole_rating = whole_counter / whole_rating

    # Iteratte through the recipes
    for recipe in recipe_list:
        # Add point for each label on the recipe according to how many time the label appears
        point = 0
        for label in recipe['labels']:
            point += point_assign.get(label, 0)
        # Calculate the recipe rating
        rating = 0
        counter = 0
        for comment in recipe['comment']:
            rating += int(comment['rating'])
            counter += 1
        if whole_counter != 0:
            # Consider the rating when assigning point
            if counter != 0:
                rating = rating / counter
            else:
                rating = whole_rating
            point  = point * rating * 0.4
        rank_recipe.append((point, str(recipe['_id'])))
    
    # Sort the recipe according to the point
    rank_recipe.sort(key=lambda x:x[0])
    rank_recipe.reverse()
    final_recipe = []
    
    # Don't recommend the recipe that is already bought
    for recipe in rank_recipe:
        (point, id) = recipe
        if not id in recipe_bought:
            final_recipe.append(id)

    return {
        "recipe_ids":final_recipe
    }

################## testing ##################
# recommendation_history("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDQgMDM6MzU6NDUuOTIyNDk0IiwicmFuZG9tbnVtYmVyIjoiMC45OTYxNzI4NzEyNDA2MDE0In0.YDxLWksLfp2eZ_CFH761821UG42nCzH28-Snvyw92qo")
