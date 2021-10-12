import database
import token_helper
from error import AccessError
import argument_checker

def product_add(token, title, photo, description, labels):
    ''' Add a product '''
    # check if the token is valid and find the user
    users = database.get_users()
    token_helper.is_token_valid(token, users)
    user = users.find_one({"token":token})
    
    # check if the user is an admin
    if not user['admin']:
        raise AccessError(description="The user does not have permission")

    # check if all fields are not empty
    argument_checker.all_not_empty([title, photo, description])

    product = {
        "title": title, 
        "photo": photo,
        "description": description,
        "labels": labels
    }

    products = database.get_products()
    result = products.insert_one(product)

    return {
        'product_id': str(result.inserted_id)
    }

users = database.get_users()
user = users.find_one({"username":"JennaChan"})
product_add(user['token'], 'fdsdfsf', 'sfsdfsd', 'sdfsdf', ['sdfsdf', 'sdfsdf'])







    
