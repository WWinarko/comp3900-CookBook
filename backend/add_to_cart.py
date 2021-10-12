from error import AccessError
import database
import token_helper
import cart_helper

def add_to_cart(token, items):
    # Validates token
    users = database.get_users()
    token_helper.is_token_valid(token, users)

    # Check if user has shopping cart already
    carts = database.get_carts()
    cart = carts.find_one({"token": token})

    # If shopping cart exists
    if (cart is not None):
        # Check the items, and modify quantity or add ingredient
        list_items = items["ingredients"]
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
        cart = {"token": token, "ingredients": items["ingredients"]}
        carts.insert_one(cart)
