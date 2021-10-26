from error import AccessError
import database
import token_helper
import cart_helper

def cart_add(token, list_items):
    ''' Add items to shopping cart'''
    # Validates token
    users = database.get_users()
    token_helper.is_token_valid(token, users)

    # Check if user has shopping cart already
    carts = database.get_carts()
    cart = carts.find_one({"token": token})

    # If shopping cart exists
    if (cart is not None):
        # Check the items, and modify quantity or add ingredient
        for item in list_items:
            ingredient = cart_helper.find_ingredient(cart, item)
            if (ingredient is not None):
                ingredient["quantity"] += item["quantity"]
            else:
                cart["ingredients"].append(item) 
        # Updates the current modifications
        cart_id = cart["_id"]
        carts.update_one({"_id": cart_id}, {"$set": {"ingredients": cart["ingredients"]}})

    # Otherwise, creates a new entry and add the ingredients
    else:
        cart = {"token": token, "ingredients": list_items}
        carts.insert_one(cart)
