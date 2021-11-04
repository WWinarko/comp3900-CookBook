from pymongo import MongoClient

def get_users():
    cluster = "mongodb+srv://cookbookla:CookBook@cluster0.ajioi.mongodb.net/CookBook?ssl=true&ssl_cert_reqs=CERT_NONE"
    client = MongoClient(cluster)
    db = client.CookBook
    users = db.User
    return users

def get_recipes():
    cluster = "mongodb+srv://cookbookla:CookBook@cluster0.ajioi.mongodb.net/CookBook?ssl=true&ssl_cert_reqs=CERT_NONE"
    client = MongoClient(cluster)
    db = client.CookBook
    recipes = db.Recipe
    return recipes

def get_products():
    cluster = "mongodb+srv://cookbookla:CookBook@cluster0.ajioi.mongodb.net/CookBook?ssl=true&ssl_cert_reqs=CERT_NONE"
    client = MongoClient(cluster)
    db = client.CookBook
    products = db.Product
    return products
    
def get_carts():
    cluster = "mongodb+srv://cookbookla:CookBook@cluster0.ajioi.mongodb.net/CookBook?ssl=true&ssl_cert_reqs=CERT_NONE"
    client = MongoClient(cluster)
    db = client.CookBook
    carts = db.Cart
    return carts

def get_orders():
    cluster = "mongodb+srv://cookbookla:CookBook@cluster0.ajioi.mongodb.net/CookBook?ssl=true&ssl_cert_reqs=CERT_NONE"
    client = MongoClient(cluster)
    db = client.CookBook
    orders = db.Order
    return orders
