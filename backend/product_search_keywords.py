import database
import re
def product_search_keyword(keyword):
    ''' list all the products with the given keyword '''
    products = database.get_products()
    product_list = list(products.find())
    product_ids = []
    

    for product in product_list:
        if re.search(keyword.lower(), product['title'].loewr()):
            product_ids.append(str(product['_id']))

    return {
        "product_ids":product_ids
    }