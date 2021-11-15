import database
import token_helper
from error import AccessError

def cart_update(token, recipe_id, ingredients):
    ''' Update cart for a single recipe section'''
    # Validates token
    users = database.get_users()
    token_helper.is_token_valid(token, users)

    # Check if user has shopping cart already
    carts = database.get_carts()
    user = users.find_one({"token":token})
    cart = carts.find_one({"user_id":str(user['_id'])})

    if (cart is not None):
        retrieve_recipe = None
        for recipe in cart['recipe_list']:
            if recipe['recipe_id'] == recipe_id:
                retrieve_recipe = recipe
                break
        if retrieve_recipe != None:
            recipe_ingredients = retrieve_recipe['ingredients']
            for ingredient in ingredients:
                for recipe_ingredient in recipe_ingredients:  
                    if recipe_ingredient['_id'] == ingredient['_id']:
                        recipe_ingredient['quantity'] = ingredient['quantity']
            carts.update_one({"_id": cart['_id']}, {"$set": {"recipe_list": cart['recipe_list']}})
        else:
            raise AccessError(description="This recipe section does not exist")
    else:
        raise AccessError(description="the cart does not exist for the user")

# cart_update('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMTQgMTg6MjU6MTMuOTg0NjQwIiwicmFuZG9tbnVtYmVyIjoiMC4wOTQ5MDE4NzY5NDIzODk5NCJ9.KOPaEQdX8yVPy5Zr2CLQtOaFnzUFBepJVa9dLRLjS3w', 
# '61822a0c5ac1298dfea87153', [{"_id":"61822388cc5920235e3244e7", "quantity":100},{"_id":"618223e0cc5920235e3244ea", "quantity":200}])