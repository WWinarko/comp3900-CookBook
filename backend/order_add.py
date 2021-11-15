from error import InputError
import argument_checker
import token_helper
import database
import datetime
import auth_helper
import email_send
import cart_clean
from bson.objectid import ObjectId

def order_add(token, firstname, lastname, email, phone, address, state, postcode, details, total):
    ''' add order to the database '''
    users = database.get_users()
    orders = database.get_orders()
    recipes = database.get_recipes()

    # Check if the arguments are of correct format
    argument_checker.all_not_empty([token, firstname, lastname, email, phone, address, state, postcode])
    argument_checker.no_white_space([token, firstname, lastname, email, phone, state, postcode])

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Check if the cart is not empty
    if len(details) <= 0:
        raise InputError(description="The cart is empty")

    # Check if email is of correct format
    if not auth_helper.is_correct_email_format(email):
        raise InputError(description="Wrong Email Format")

    user = users.find_one({"token":token})

    # create the order
    order = {
        "status":"processing",
        "user_id":str(user['_id']),
        "firstname":firstname,
        "lastname":lastname,
        "address":address,
        "state":state,
        "postcode":postcode,
        "email":email,
        "phone":phone,
        "details":details,
        "time":datetime.datetime.strftime(datetime.datetime.now(), "%d/%m/%Y %H:%M"), 
        "total":total
    }

    for recipe in details:
        recipe_own = recipes.find_one({"_id":ObjectId(recipe['recipe_id'])})
        user = users.find_one({"_id":ObjectId(recipe_own['owner_id'])})
        newReward = user['reward'] + recipe['recipe_subtotal'] * 0.05
        users.update_one({"_id": user['_id']}, {"$set": {"reward":newReward}})

    # insert the order to the database
    result = orders.insert_one(order)
    order_id = str(result.inserted_id)

    # send email with order details to user
    email_send.email_send(token, order_id, email, firstname, address, state, postcode, phone)

    # clean shopping cart
    cart_clean.cart_clean(token)

    # return order_id and token
    return {
        'order_id': order_id,
        'token': token
    }

# order_add('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMTQgMTg6MjU6MTMuOTg0NjQwIiwicmFuZG9tbnVtYmVyIjoiMC4wOTQ5MDE4NzY5NDIzODk5NCJ9.KOPaEQdX8yVPy5Zr2CLQtOaFnzUFBepJVa9dLRLjS3w',
# "trina", "chang", "ks20342@gmail.com", "09123", "sdfsfsfsdf", "sdfsdf", "dfsdf", [{'recipe_id': '61822a0c5ac1298dfea87153', 'recipe_ingredients': [{'id': '61822388cc5920235e3244e7', 'title': 'chicken breast', 'photo': 'dfdsfsdfsfsfsd', 'description': 'yummy chicken breast', 'price': 1.5, 'quantity': 100, 'subtotal': 150.0}, {'id': '618223e0cc5920235e3244ea', 'title': 'chicken fillet', 'photo': 'bnkmfgljdsf', 'description': 'yummy chicken fillet', 'price': 2, 'quantity': 200, 'subtotal': 400}], 'recipe_subtotal': 550.0}, {'recipe_id': '61833fa71f805c540f9562f4', 'recipe_ingredients': [{'id': '61822388cc5920235e3244e7', 'title': 'chicken breast', 'photo': 'dfdsfsdfsfsfsd', 'description': 'yummy chicken breast', 'price': 1.5, 'quantity': 1, 'subtotal': 1.5}, {'id': '618223f6cc5920235e3244ed', 'title': 'chicken leg', 'photo': 'njlkerwe', 'description': 'yummy chicken leg', 'price': 1, 'quantity': 3, 'subtotal': 3}], 'recipe_subtotal': 4.5}],
# 554.5
# )

# token = "b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDEgMTY6NTY6MTAuNzIzMTkzIiwicmFuZG9tbnVtYmVyIjoiMC4xOTc5MTg4NDY2OTA2NzcyNyJ9.kJxOyLv0w2Nq7WZ1KdgTxY_2jKhJprOBriiY33zykZY'"
# cart = cart_retrieve(token)
# items = cart["ingredienst"]
# total = cart["total"]
# order_add(token, "Maria", "Cuyutupa", "maniga2575@hotmail.com", "012345671314", "Sydney", "NSW", "2138", items, total) 


    