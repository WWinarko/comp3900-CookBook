from error import AccessError
import token_helper
import database
import cart_helper

def remove_from_cart(token, item):
    ''' Remove item (only one) from shopping cart '''
    # Validates token
    users = database.get_users()
    token_helper.is_token_valid(token, users)

    # Remove item
    carts = database.get_carts()
    cart = carts.find_one({"token": token})
    ingredient = cart_helper.find_ingredient(cart, item["ingredients"][0])
    cart["ingredients"].remove(ingredient)

    # If shopping cart empty, then the entry is deleted
    if len(cart["ingredients"]):
        cart_id = cart["_id"]
        carts.update_one({"_id": cart_id}, {"$set": {"ingredients": cart["ingredients"]}})
    else:
        carts.delete_one({"token": token})