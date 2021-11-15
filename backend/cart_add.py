from error import AccessError
import database
import token_helper
import cart_helper

def cart_add(token, recipe_id, ingredients):
    ''' Add items to shopping cart'''
    # Validates token
    users = database.get_users()
    token_helper.is_token_valid(token, users)

    # Check if user has shopping cart already
    carts = database.get_carts()
    user = users.find_one({"token":token})
    cart = carts.find_one({"user_id":str(user['_id'])})
    # If shopping cart exists
    if (cart is not None):
        retrieve_recipe = None
        for recipe in cart['recipe_list']:
            if recipe['recipe_id'] == recipe_id:
                retrieve_recipe = recipe
                break
        if retrieve_recipe != None:
            recipe_ingredients = retrieve_recipe['ingredients']
            for ingredient in ingredients:
                retrieve = False
                for recipe_ingredient in recipe_ingredients:  
                    if recipe_ingredient['_id'] == ingredient['_id']:
                        recipe_ingredient['quantity'] += ingredient['quantity']
                        retrieve = True
                if not retrieve:
                    recipe_ingredients.append(ingredient)
    
            for recipe in cart['recipe_list']:
                if recipe['recipe_id'] == recipe_id:
                    recipe = retrieve_recipe
        else:
            retrieve_recipe = dict()
            retrieve_recipe['recipe_id'] = recipe_id
            retrieve_recipe['ingredients'] = ingredients
            cart['recipe_list'].append(retrieve_recipe)
        carts.update_one({"_id": cart['_id']}, {"$set": {"recipe_list": cart['recipe_list']}})
    else:
        cart = {
            "user_id":str(user['_id']), 
            "recipe_list":[
                {
                    "recipe_id":recipe_id,
                    "ingredients":ingredients
                }
            ]
        }
        carts.insert_one(cart)

# cart_add('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMTQgMTg6MjU6MTMuOTg0NjQwIiwicmFuZG9tbnVtYmVyIjoiMC4wOTQ5MDE4NzY5NDIzODk5NCJ9.KOPaEQdX8yVPy5Zr2CLQtOaFnzUFBepJVa9dLRLjS3w', "123", [{"_id":"61894270e1ae0f08edeb81d7", "quantity":3},{"_id":"123", "quantity":100}]
# )

'''
cart
{
    user_id: 12313123
    recipe_list:[
        {
            recipe_id:123
            ingredients:[
                {
                    _id:
                    quantity:
                },
                {
                    _id:
                    quantity
                }
            ]
        }
    ]
}
'''