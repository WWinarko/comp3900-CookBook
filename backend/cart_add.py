from error import AccessError
import database
import token_helper
import cart_helper

def cart_add(token, ingredients):
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
        # Check the items, and modify quantity or add ingredient
        for ingredient in ingredients:
            cart_ingredient = cart_helper.find_ingredient(cart, ingredient)
            if (cart_ingredient is not None):
                cart_ingredient["quantity"] += ingredient["quantity"]
            else:
                cart["ingredients"].append(ingredient) 
        # Updates the current modifications
        cart_id = cart["_id"]
        carts.update_one({"_id": cart_id}, {"$set": {"ingredients": cart["ingredients"]}})

    # Otherwise, creates a new entry and add the ingredients
    else:
        cart = {"user_id":str(user['_id']), "ingredients":ingredients}
        carts.insert_one(cart)
