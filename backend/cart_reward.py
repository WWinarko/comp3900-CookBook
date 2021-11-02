from cart_retrieve import cart_retrieve
from order_add import order_add
from error import InputError
import database

def cart_reward(token, email, phone, address, state, postcode):
    # Obtains user's reward points
    users = database.get_users()
    user = users.find_one({"token": token})
    points_reward = user["point_rewards"]
    user_id = user["_id"]
    
    # Obtains the total amount of the transaction
    cart = cart_retrieve(token)
    ingredients = cart["ingredients"]
    total = cart["total"]

    # Raises an error if user does not have enough points
    if (points_reward < total):
        raise InputError(description="User does not have enough reward points")

    # Creates order
    points_diff = points_reward - total
    users.update_one({"_id": user_id}, {"$set": {"point_rewards": points_diff}})
    order = order_add(token, email, phone, address, state, postcode, ingredients, total)
    return order

'''
# Testing
token = "b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDEgMTY6NTY6MTAuNzIzMTkzIiwicmFuZG9tbnVtYmVyIjoiMC4xOTc5MTg4NDY2OTA2NzcyNyJ9.kJxOyLv0w2Nq7WZ1KdgTxY_2jKhJprOBriiY33zykZY'"
order = cart_reward(token, "mariaexample@gmail.com", "01234567891", "Sydney", "NSW", "2138")
print(order)
'''

