import database
import token_helper
from datetime import datetime
from error import AccessError, InputError

def sales_timeframe(token, initial_date, end_date):
    '''Return sales given a time frame'''
    # Verify user
    users = database.get_users()
    token_helper.is_token_valid(token, users)
    user = users.find_one({"token":token})
    
    # Check if the user is an admin
    if not user['admin']:
        raise AccessError(description="The user does not have permission")

    # Check that input is coherent
    initial = datetime.strptime(initial_date, "%d/%m/%Y").date()
    end = datetime.strptime(end_date, "%d/%m/%Y").date()
    if end < initial:
        raise InputError(description="End date cannot be earlier than initial date")

    # Format time
    initial_date = initial_date + " 00:01"
    end_date = end_date + " 23:59"

    # Obtain orders
    orders = database.get_orders()
    orders = orders.find({"time" : {
            "$gte": initial_date,
            "$lt": end_date
            }})
    
    # Check if there is orders
    if len(list(orders)):
        raise AccessError(description="No sales have been registered for this time frame")

    total = 0
    for order in orders:
        total += order["total"]
    
    return "{:.2f}".format(total)