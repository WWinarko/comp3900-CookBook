from flask import Flask, request
from flask_cors import CORS
from json import dumps

from auth_register import auth_register
from auth_login import auth_login
from auth_logout import auth_logout

from recipe_view import recipe_view
from recipe_upload import recipe_upload
from recipe_listall import recipe_listall
from recipe_comment import recipe_comment
from recipe_comment_view import recipe_comment_view

from product_add import product_add
from product_view import product_view
from product_search_keywords import product_search_keyword
from product_listall import product_listall

from cart_add import cart_add
from cart_remove import cart_remove
from cart_reward import cart_reward
from cart_retrieve import cart_retrieve

from order_update import order_update
from order_listall import order_listall
from order_view import order_view
from order_add import order_add
from order_details import order_details

from recommendation_questions import recommendation_questions
from recommendation_history import recommendation_history

from admin_check import admin_check

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
    return dumps(
        recipe_view(recipe_id)
    )

@APP.route("/recipe/upload", methods=['POST'])
def recipe_upload_root():
    ''' Upload a recipe '''
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
    labels = payload['labels']
    return dumps(
        recipe_upload(token, title, intro, photo, difficulty, cooktime, preptime, serves, ingredients, steps, labels)
    )

@APP.route("/recipe/comment", methods=['POST'])
def recipe_comment_root():
    ''' Comment on a recipe '''
    payload = request.get_json()
    token = payload['token']
    comment = payload['comment']
    rating = payload['rating']
    recipe_id = payload['recipe_id']
    return dumps(
        recipe_comment(token, comment, rating, recipe_id)
    )

@APP.route("/recipe/comment_view", methods=['GET'])
def recipe_comment_view_root():
    ''' View the commens on a recipe '''
    recipe_id = request.args.get('recipe_id')
    return dumps(
        recipe_comment_view(recipe_id)
    )

@APP.route("/recipe/listall", methods=['GET'])
def recipe_list_all_root():
    ''' Return recipe information '''
    return dumps(recipe_listall())

##### PRODUCT ROUTE #####

@APP.route("/product/add", methods=['POST'])
def product_add_root():
    ''' Add a product '''
    payload = request.get_json()
    token = payload['token']
    title = payload['title']
    photo = payload['photo']
    description = payload['description']
    price = payload['price']
    labels = payload['labels']
    return dumps(
        product_add(token, title, photo, description, price, labels)
    )

@APP.route("/product/view", methods=['GET'])
def product_view_root():
    ''' Return order information '''
    product_id = request.args.get('product_id')
    return dumps(
        product_view(product_id)
    )

@APP.route("/product/search_keyword", methods=['GET'])
def product_search_keyword_root():
    ''' List the products that have the keyword '''
    keyword = request.args.get('keyword')
    return dumps(
        product_search_keyword(keyword)
    )

@APP.route("/product/listall", methods=['GET'])
def product_listall_root():
    ''' List all the products '''
    return dumps(
        product_listall()
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

@APP.route("/cart/paypal", methods=['POST'])
def cart_paypal_root():
    ''' Add an order to the database '''
    payload = request.get_json()
    token = payload['token']
    firstname = payload['firstname']
    lastname= payload['lastname']
    email = payload['email']
    phone = payload['phone']
    address = payload['address']
    state = payload['state']
    postcode = payload['postcode']
    details = payload['details']
    total = payload['total']
    return dumps(
        order_add(token, firstname, lastname, email, phone, address, state, postcode, details, total)
    )

@APP.route("/cart/retrieve", methods=['GET'])
def retrieve_cart_root():
    ''' Retrieve products and total from shopping cart'''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        cart_retrieve(token)
    )

@APP.route("/cart/reward", methods=['POST'])
def rewards_cart_root():
    ''' Place order after checking reward points '''
    payload = request.get_json()
    token = payload['token']
    firstname = payload['firstname']
    lastname = payload['lastname']
    email = payload['email']
    phone = payload['phone']
    address = payload['address']
    state = payload['state']
    postcode = payload['postcode']
    return dumps(
        cart_reward(token, firstname, lastname, email, phone, address, state, postcode)
    )

##### ORDER ROUTE #####

@APP.route("/order/view", methods=['GET'])
def order_view_root():
    ''' Return order information '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    order_id = request.args.get('order_id')
    return dumps(
        order_view(token, order_id)
    )

@APP.route("/order/listall", methods=['GET'])
def order_listall_root():
    ''' Return order list '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    status = request.args.get('status')
    return dumps(
        order_listall(token, status)
    )

@APP.route("/order/details", methods=['GET'])
def order_details_root():
    ''' Return order details '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
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

##### Recommendation ROUTE #####

@APP.route("/recommendation/questions", methods=['GET'])
def recommendation_questions_root():
    ''' Recommend reqcipes according the answers to the survey '''
    q1 = request.args.get('q1')
    q2 = request.args.get('q2')
    q3 = request.args.get('q3')
    q4 = request.args.get('q4')
    q5 = request.args.get('q5')
    q6 = request.args.get('q6')
    return dumps(
        recommendation_questions(q1, q2, q3, q4, q5, q6)
    )

@APP.route("/recommendation/history", methods=['GET'])
def recommendation_history_root():
    ''' Recommend reqcipes according the account history '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        recommendation_history(token)
    )

##### Admin ROUTE #####

@APP.route("/admin/check", methods=['GET'])
def admin_check_root():
    ''' Check if the user is an admin '''
    headers = request.headers
    bearer = headers.get('Authorization')    # Bearer YourTokenHere
    token = bearer.split()[1]  # YourTokenHere
    return dumps(
        admin_check(token)
    )

if __name__ == "__main__":
    APP.run()
