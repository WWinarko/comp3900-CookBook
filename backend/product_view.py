import database
from bson.objectid import ObjectId

def product_view(product_id):
    ''' reutnr the item of given product_id '''
    products = database.get_products

    product = products.find_one({"_id":ObjectId(product_id)})

    return {
        "title":product['title'],
        "photo":product['photo'],
        "description":product['description'],
        "labels":product['labels']
    }