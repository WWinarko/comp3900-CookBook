from error import AccessError
from bson.objectid import ObjectId
import token_helper
import database
from cart_add import cart_add

def cart_retrieve(token):
    ''' Retrieves ingredients and total from the shopping cart '''
    # Validates token
    users = database.get_users()
    token_helper.is_token_valid(token, users)

    # Retrieve cart from database
    carts = database.get_carts()
    cart = carts.find_one({"token": token})

    ingredients_list = []
    total = 0
    # If cart exists, it will return the list of ingredients. Otherwise, 
    # it will return an empty list.
    if (cart is not None):
        products = database.get_products()
        ingredients = cart["ingredients"]
        for ingredient in ingredients:
            quantity = ingredient["quantity"]
            product = products.find_one({"_id": ObjectId(ingredient["_id"])})
            subtotal = product["price"] * quantity
            total += subtotal
            product.update({"quantity": quantity})
            product.update({"subtotal": subtotal})
            ingredients_list.append(product)

    return {
        'ingredients': ingredients_list,
        'total': total
    }

'''
# Testing
token = "b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDEgMTY6NTY6MTAuNzIzMTkzIiwicmFuZG9tbnVtYmVyIjoiMC4xOTc5MTg4NDY2OTA2NzcyNyJ9.kJxOyLv0w2Nq7WZ1KdgTxY_2jKhJprOBriiY33zykZY'"
id_1 = "617f75cbdd37e72f91db2055"
id_2 = "617f775900967e0a4a27f217"

product_1 = [{
    '_id': id_1,
    'quantity': 2
}]

product_2 = [{
    '_id': id_2,
    'quantity': 4
}]

cart_add(token, product_1)
cart_add(token, product_2)
print(cart_retrieve(token))
'''