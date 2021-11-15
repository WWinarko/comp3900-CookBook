import database
import token_helper
from error import AccessError

def sales_product(token, product_id, orders=None):
    # Verify user
    users = database.get_users()
    token_helper.is_token_valid(token, users)
    user = users.find_one({"token":token})
    
    # Check if the user is an admin
    if not user['admin']:
        raise AccessError(description="The user does not have permission")

    # If orders is not specified, it assigns the one from database
    if orders is None:
        orders = database.get_orders()
    orders = orders.find({"details": {'$elemMatch': {'_id': product_id}}})

    total = 0
    for order in orders:
        products = order["details"]
        for product in products:
            if product["_id"] == product_id:
                #total += product["subtotal"]
                #break
                pass

    return "{:.2f}".format(total)

'''
product_id = "618b5044ce6dbf9e88fd2cd7"

orders = database.get_orders()
orders = orders.find({"details": {'$elemMatch': {'_id': product_id}}})

total = 0
for order in orders:
    products = order["details"]
    for product in products:
        if product["_id"] == product_id:
            total += product["quantity"]

print(total)
'''