from error import InputError
import token_helper
import argument_checker
import auth_helper
import database
import cart_retrieve
import order_add

def cart_reward(token, firstname, lastname, email, phone, address, state, postcode):
    # Obtain user's information
    users = database.get_users()
    user = users.find_one({"token": token})
    user_id = user["_id"]

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Obtain cart information
    cart = cart_retrieve.cart_retrieve(token)
    ingredients = cart["ingredients"]

    # Check if the cart is not empty
    if len(ingredients) <= 0:
        raise InputError(description="The cart is empty")

    # Check if user has enough points
    points_reward = user["point_rewards"]
    total = cart["total"]
    if (points_reward < total):
        raise InputError(description="User does not have enough reward points")

    # Check if the arguments are of correct format
    argument_checker.all_not_empty([token, firstname, lastname, email, phone, address, state, postcode])
    argument_checker.no_white_space([token, firstname, lastname, email, phone, state, postcode])

    # Check if email is of correct format
    if not auth_helper.is_correct_email_format(email):
        raise InputError(description="Wrong Email Format")

    # Creates order
    points_diff = points_reward - total
    users.update_one({"_id": user_id}, {"$set": {"point_rewards": points_diff}})
    return order_add.order_add(token, email, phone, address, state, postcode, ingredients, total)

'''
# Testing
token = "b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDEgMTY6NTY6MTAuNzIzMTkzIiwicmFuZG9tbnVtYmVyIjoiMC4xOTc5MTg4NDY2OTA2NzcyNyJ9.kJxOyLv0w2Nq7WZ1KdgTxY_2jKhJprOBriiY33zykZY'"
order = cart_reward(token, "mariaexample@gmail.com", "01234567891", "Sydney", "NSW", "2138")
print(order)
'''

