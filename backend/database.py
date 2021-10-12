from pymongo import MongoClient

def get_users():
    cluster = "mongodb+srv://cookbookla:CookBook@cluster0.ajioi.mongodb.net/CookBook?ssl=true&ssl_cert_reqs=CERT_NONE"
    client = MongoClient(cluster)
    db = client.CookBook
    users = db.User
    return users

def get_carts():
    cluster = "mongodb+srv://cookbookla:CookBook@cluster0.ajioi.mongodb.net/CookBook?ssl=true&ssl_cert_reqs=CERT_NONE"
    client = MongoClient(cluster)
    db = client.CookBook
    carts = db.Cart
    return carts
