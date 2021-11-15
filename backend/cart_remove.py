from error import AccessError
import token_helper
import database
import cart_helper
from error import AccessError
def cart_remove(token, recipe_id, item):
    ''' Remove item (only one) from shopping cart '''
    # Validates token
    users = database.get_users()
    carts = database.get_carts()

    token_helper.is_token_valid(token, users)

    # Remove item
    user = users.find_one({"token":token})
    cart = carts.find_one({"user_id":str(user['_id'])})

    retrieve_recipe = None
    for recipe in cart['recipe_list']:
        if recipe['recipe_id'] == recipe_id:
            retrieve_ingredient = None
            for ingredient in recipe['ingredients']:
                if ingredient['_id'] == item:
                    retrieve_ingredient = ingredient
            if retrieve_ingredient == None:
                raise AccessError(description="ingredient not found")
            recipe['ingredients'].remove(retrieve_ingredient)
            retrieve_recipe = recipe
    if retrieve_recipe == None:
        raise AccessError(description="recipe not found")
    # If shopping cart empty, then the entry is deleted
    if not len(retrieve_recipe['ingredients']):
        cart['recipe_list'].remove(retrieve_recipe)
    carts.update_one({"_id": cart['_id']}, {"$set": {"recipe_list": cart['recipe_list']}})
    if not len(cart['recipe_list']):
        carts.delete_one({"user_id":str(user['_id'])})

cart_remove('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMTQgMTg6MjU6MTMuOTg0NjQwIiwicmFuZG9tbnVtYmVyIjoiMC4wOTQ5MDE4NzY5NDIzODk5NCJ9.KOPaEQdX8yVPy5Zr2CLQtOaFnzUFBepJVa9dLRLjS3w', "61833fa81f805c540f9562fd","123")