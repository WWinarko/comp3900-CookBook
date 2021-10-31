import database
import token_helper
import datetime

def order_listall(token, status):
    ''' view the list of the orders according to the status given '''
    users = database.get_users()
    orders = database.get_orders()

    # Check if the token is valid
    token_helper.is_token_valid(token, users)

    # order the list according to the time the orders were made
    order_list = list(orders.find())
    order_list = sorted(order_list, key=lambda d: datetime.datetime.strptime(d['time'], "%d/%m/%Y %H:%M"))
    order_listall = []

    # Check if the token is owned by an admin
    if token_helper.check_admin(token, users):
        # iterate over the orders
        for order in order_list:
            # status check
            if status == 'all' or order['status'] == status:
                order_listall.append(str[order['_id']])
    else:
        user = users.find_one({"token":token})
        # iterate over the orders
        for order in order_list:
            # status and permission check
            if (order['user_id'] == str(user['_id']) and 
                (status == 'all' or order['status'] == status)):
                order_listall.append(str(order['_id']))
    
    # return a list of order_id accroding the the condition given
    return {
        "order_list":order_listall
    }

    
    