import database

def product_listall():
    ''' list all the products '''
    products = database.get_products()
    product_list = list(products.find())
    product_ids = []

    for product in product_list:
        product_ids.append(str(product['_id']))
    
    return {
        "product_list":product_ids
    }