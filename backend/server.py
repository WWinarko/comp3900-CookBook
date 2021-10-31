from flask import Flask, request
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

from order_update import order_update
from order_listall import order_listall
from order_view import order_view
from order_add import order_add
from order_details import order_details

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

##### ORDER ROUTE #####

@APP.route("/order/view", methods=['GET'])
def order_view_root():
    ''' Return order information '''
    token = request.args.get('token')
    order_id = request.args.get('order_id')

    return dumps(
        order_view(token, order_id)
    )

@APP.route("/order/listall", methods=['GET'])
def order_listall_root():
    ''' Return order list '''
    token = request.args.get('token')
    status = request.args.get('status')
    return dumps(
        order_listall(token, status)
    )

@APP.route("/order/details", methods=['GET'])
def order_listall_root():
    ''' Return order details '''
    token = request.args.get('token')
    order_id = request.args.get('order_id')
    return dumps(
        order_details(token, order_id)
    )

@APP.route("/order/update", methods=['POST'])
def order_update_root():
    ''' Update order status '''
    payload = request.get_json()
    token = payload['token']
    order_id = payload['order_id']
    status = payload['status']
    return dumps(
        order_update(token, order_id, status)
    )

@APP.route("/order/add", methods=['POST'])
def order_add_root():
    ''' Update order status '''
    payload = request.get_json()
    token = payload['token']
    email = payload['email']
    phone = payload['phone']
    address = payload['address']
    state = payload['state']
    postcode = payload['postcode']
    details = payload['details']
    total = payload['total']
    return dumps(
        order_add(token, email, phone, address, state, postcode, details, total)
    )

if __name__ == "__main__":
    APP.run()
