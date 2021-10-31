from error import AccessError
import token_helper
import database

def cart_retrieve(token):
    # Validates token
    users = database.get_users()
    token_helper.is_token_valid(token, users)

    # Retrieve cart from database
    carts = database.get_carts()
    cart = carts.find_one({"token": token})

    # If shopping cart is empty, raise an error
    if (cart is None):
        pass

    # Otherwise go through the list of ingredients and
    # retrieve it
    products = database.get_products()
    ingredients_list = []
    ingredients = cart["ingredients"]
    for ingredient in ingredients:
        product = products.find_one({"_id": ingredient["_id"]})
        subtotal = product["price"] * ingredient["quantity"]
        product.update({"subtotal": subtotal})
        ingredients_list.append(product)

    return {
        'ingredients': ingredients_list,
        'token': token
    }
