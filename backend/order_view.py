import database
import token_helper
import order_helper
from error import AccessError
from bson.objectid import ObjectId
import json

def order_view(token, order_id):
    ''' view the information associated with the order'''
    users = database.get_users()
    orders = database.get_orders()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Check if the order exists
    order_helper.check_order_exist(ObjectId(order_id), orders)

    # Check if the user has permission 
    if not order_helper.check_permission(token, ObjectId(order_id), users, orders):
        raise AccessError(description="Does not have permission to view this order")
    
    # Get the information
    order = orders.find_one({"_id":ObjectId(order_id)})
    user = users.find_one({'_id':ObjectId(order['user_id'])})
    
    # return the order information
    return {
        'order_id': order_id,
        'status': order['status'],
        'username': user['username'],
        'order_time': order['time'],
        'firstname':order['firstname'],
        'lastname':order['lastname'],
        'address': order['address'],
        'state': order['state'],
        'postcode': order['postcode']
    }
    
    

