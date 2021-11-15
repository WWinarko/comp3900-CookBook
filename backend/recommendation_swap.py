import database
from bson.objectid import ObjectId

def recommendation_swap(product_id):
    ''' recommend swap ingredient '''
    products = database.get_products()
    product = products.find_one({"_id":ObjectId(product_id)})
    
    labels = product['labels']
    labels = set(labels)
    product_list = products.find()
    return_list = []
    for single_product in product_list:
        single_labels = single_product['labels']
        single_labels = set(single_labels)
        if labels == single_labels:
            return_list.append(str(single_product['_id']))

    return {
        "product_id":return_list
    }