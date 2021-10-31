from error import InputError
import argument_checker
import token_helper
import database
import datetime
import auth_helper

def order_add(token, email, phone, address, state, postcode, details, total):
    ''' add order to the database '''
    users = database.get_users()
    orders = database.get_orders()

    # Check if the arguments are of correct format
    argument_checker.all_not_empty([token, email, phone, address, state, postcode])
    argument_checker.no_white_space([token, email, phone, state, postcode])

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
        "address":address,
        "state":state,
        "postcode":postcode,
        "email":email,
        "phone":phone,
        "details":details,
        "time":datetime.datetime.strftime(datetime.datetime.now(), "%d/%m/%Y %H:%M"), 
        "total":total
    }

    # insert the order to the database
    result = orders.insert_one(order)
    order_id = str(result.inserted_id)

    # return order_id and token
    return {
        'order_id': order_id,
        'token': token
    }

    


    