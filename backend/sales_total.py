import database
import token_helper
from error import AccessError

def sales_total(token, orders=None):
    ''' Return total sales '''
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

    total = 0
    for order in orders.find():
        total += order["total"]

    return "{:.2f}".format(total)

'''
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDkgMjE6NDA6MDUuMjEzMjQyIiwicmFuZG9tbnVtYmVyIjoiMC43OTEyODU1NTU1OTc4NjQ2In0.Fixc1v0ehApZBMXzWpOpkexLLzCRR2R3wb_1yA1YqHg"
print(sales_total(token))
'''
