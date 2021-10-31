import database
import token_helper
import order_helper
from bson.objectid import ObjectId
from error import AccessError

def order_details(token, order_id):
    ''' view the detail associated with the order'''
    users = database.get_users()
    orders = database.get_orders()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # Check if the order exists
    order_helper.check_order_exist(ObjectId(order_id), orders)

    # Check if the user has permission 
    if not order_helper.check_permission(token, ObjectId(order_id), users, orders):
        raise AccessError(description="Does not have permission to view this order")
    
    order = orders.find_one({"_id":ObjectId(order_id)})
    details = order['details']

    # return the order details(json:product_id, quantity)
    return {
        "details":details,
        "order_id":order_id,
        "total":order['total']
    }

    
