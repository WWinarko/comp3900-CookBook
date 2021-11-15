from error import AccessError
from bson.objectid import ObjectId
import token_helper
import database

def cart_retrieve(token):
    ''' Retrieves ingredients and total from the shopping cart '''
    # Validates token
    users = database.get_users()
    carts = database.get_carts()

    token_helper.is_token_valid(token, users)

    # Retrieve cart from database
    user = users.find_one({"token":token})
    cart = carts.find_one({"user_id":str(user['_id'])})

    section_list = []
    total = 0
    # If cart exists, it will return the list of ingredients. Otherwise, 
    # it will return an empty list.
    if (cart is not None):
        products = database.get_products()
        recipes = cart["recipe_list"]
        for recipe in recipes:
            recipe_total = 0
            recipe_list = []
            for ingredient in recipe['ingredients']:
                product = products.find_one({"_id": ObjectId(ingredient["_id"])})
                subtotal = product["price"] * ingredient["quantity"]
                total += subtotal
                recipe_total += subtotal
                product_return = {
                    "id":str(product['_id']),
                    "title":product['title'],
                    "photo":product['photo'],
                    "description":product['description'],
                    "price":product['price'],
                    "quantity":ingredient["quantity"],
                    "subtotal":subtotal,
                }
                recipe_list.append(product_return)
            section_list.append({"recipe_id":recipe['recipe_id'], "recipe_ingredients":recipe_list,"recipe_subtotal":recipe_total})
    else:
        raise AccessError(description="No cart for this user")

    return {
        'section_list': section_list,
        'total': total
    }

# print(cart_retrieve('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMTQgMTg6MjU6MTMuOTg0NjQwIiwicmFuZG9tbnVtYmVyIjoiMC4wOTQ5MDE4NzY5NDIzODk5NCJ9.KOPaEQdX8yVPy5Zr2CLQtOaFnzUFBepJVa9dLRLjS3w'))

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