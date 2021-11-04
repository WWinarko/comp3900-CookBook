from error import AccessError
import token_helper
import database
import cart_helper

def cart_remove(token, item):
    ''' Remove item (only one) from shopping cart '''
    # Validates token
    users = database.get_users()
    carts = database.get_carts()

    token_helper.is_token_valid(token, users)

    # Remove item
    user = users.find_one({"token":token})
    cart = carts.find_one({"user_id":str(user['_id'])})
    ingredient = cart_helper.find_ingredient(cart, item)
    cart["ingredients"].remove(ingredient)

    # If shopping cart empty, then the entry is deleted
    if len(cart["ingredients"]):
        cart_id = cart["_id"]
        carts.update_one({"_id": cart_id}, {"$set": {"ingredients": cart["ingredients"]}})
    else:
        carts.delete_one({"user_id":str(user['_id'])})