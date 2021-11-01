from flask import Flask, request
from backend.cart_retrieve import cart_retrieve
from backend.cart_reward import cart_reward
from flask_cors import CORS
from json import dumps

from auth_register import auth_register
from auth_login import auth_login
from auth_logout import auth_logout

from recipe_view import recipe_view
from recipe_upload import recipe_upload
from recipe_listall import recipe_listall

from product_add import product_add

from cart_add import cart_add
from cart_remove import cart_remove


def default_handler(err):
    ''' Default Handle '''
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__)
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, default_handler)

##### AUTH ROUTE #####

@APP.route("/auth/register", methods=['POST'])
def auth_register_root():
    ''' Register User '''
    payload = request.get_json()
    first_name = payload['first_name']
    last_name = payload['last_name']
    email = payload['email']
    address = payload['address']
    state = payload['state']
    postcode = payload['postcode']
    phone = payload['phone']
    username = payload['username']
    password = payload['password']
    confirmpassword = payload['confirmpassword']
    return dumps(
        auth_register(first_name, last_name, email, address, state, postcode, phone, username, password, confirmpassword)
    )

@APP.route("/auth/login", methods=['POST'])
def auth_login_root():
    ''' Login a user '''
    payload = request.get_json()
    return dumps(auth_login(payload['username'], payload['password']))


@APP.route("/auth/logout", methods=['POST'])
def auth_logout_root():
    ''' Logs out a user '''
    payload = request.get_json()
    return dumps(auth_logout(payload['token']))

##### RECIPE ROUTE #####

@APP.route("/recipe/view", methods=['GET'])
def recipe_view_root():
    ''' Return recipe information '''
    recipe_id = request.args.get('recipe_id')
    return dumps(recipe_view(recipe_id))

@APP.route("/recipe/upload", methods=['POST'])
def recipe_upload_root():
    ''' Register User '''
    payload = request.get_json()
    token = payload['token']
    title = payload['title']
    intro = payload['intro']
    photo = payload['photo']
    difficulty = payload['difficulty']
    cooktime= payload['cooktime']
    preptime = payload['preptime']
    serves = payload['serves']
    steps = payload['steps']
    ingredients = payload['ingredients']
    return dumps(
        recipe_upload(token, title, intro, photo, difficulty, cooktime, preptime, serves, ingredients, steps)
    )

@APP.route("/recipe/listall", methods=['GET'])
def recipe_list_all_root():
    ''' Return recipe information '''
    return dumps(recipe_listall())

##### PRODUCT ROUTE #####

@APP.route("/product/add", methods=['POST'])
def product_add_root():
    ''' Register User '''
    payload = request.get_json()
    token = payload['token']
    title = payload['title']
    photo = payload['photo']
    description = payload['description']
    labels = payload['labels']
    return dumps(
        product_add(token, title, photo, description, labels)
    )
    
##### CART ROUTE #####

@APP.route("/cart/add", methods=['POST'])
def add_to_cart_root():
    ''' Add product to shopping cart '''
    payload = request.get_json()
    token = payload['token']
    list_items = payload['ingredients']
    return dumps(
        cart_add(token, list_items)
    )

@APP.route("/cart/remove", methods=['POST'])
def remove_from_cart_root():
    ''' Remove product from shopping cart '''
    payload = request.get_json()
    token = payload['token']
    item = payload['ingredients']
    return dumps(
        cart_remove(token, item)
    )

@APP.route("/cart/retrieve", methods=['GET'])
def retrieve_cart_root():
    ''' Retrieve products and total from shopping cart'''
    payload = request.get_json()
    return dumps(
        cart_retrieve(payload['token'])
    )

@APP.route("/cart/reward", methods=['POST'])
def rewards_cart_root():
    ''' Place order after checking reward points '''
    payload = request.get_json()
    token = payload['token']
    email = payload['email']
    phone = payload['phone']
    address = payload['address']
    state = payload['state']
    postcode = payload['postcode']
    return dumps(
        cart_reward(token, email, phone, address, state, postcode)
    )

if __name__ == "__main__":
    APP.run()
