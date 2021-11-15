import database
import token_helper
from error import AccessError

def sales_product(token, product_id):
    ''' Return total sales of a product '''
    # Verify user
    users = database.get_users()
    token_helper.is_token_valid(token, users)
    user = users.find_one({"token":token})
    
    # Check if the user is an admin
    if not user['admin']:
        raise AccessError(description="The user does not have permission")

    # If orders is not specified, it assigns the one from database
    orders = database.get_orders()
    orders = orders.find({"details": {'$elemMatch': {'_id': product_id}}})

    # Check if product has been sold before
    if len(list(orders)):
        raise AccessError(description="No sales have been registered for this product")

    total = 0
    for order in orders:
        products = order["details"]
        for product in products:
            if product["_id"] == product_id:
                total += product["subtotal"]
                break

    return "{:.2f}".format(total)