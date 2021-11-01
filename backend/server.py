from flask import Flask, request
from flask_cors import CORS
from json import dumps
from flask_restx import Resource, Api, reqparse, fields, marshal

from auth_register import auth_register
from auth_login import auth_login
from auth_logout import auth_logout

from recipe_view import recipe_view
from recipe_upload import recipe_upload
from recipe_listall import recipe_listall

from product_add import product_add

from cart_add import cart_add
from cart_remove import cart_remove

from profile_view import profile_view

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
api = Api(APP)

CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, default_handler)

##### AUTH ROUTE #####
auth_ns = api.namespace("auth", description='Auth operations')

@auth_ns.param('first_name', 'user first name')
@auth_ns.param('last_name', 'user last name')
@auth_ns.param('email', 'user email')
@auth_ns.param('address', 'user street address')
@auth_ns.param('state', 'user state')
@auth_ns.param('postcode', 'user postcode')
@auth_ns.param('phone', 'user phone number')
@auth_ns.param('username', 'username')
@auth_ns.param('password', 'password')
@auth_ns.param('confirmpaassword', 'password confirmation')
@auth_ns.response(200, 'Success')
@auth_ns.route("/register")
class auth_register_root(Resource):
    ''' Register User '''
    def post(self):
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
        ), 200

@auth_ns.param('username', 'username')
@auth_ns.param('password', 'password')
@auth_ns.response(200, 'Success')
@auth_ns.route("/login")
class auth_login_root(Resource):
    ''' Logs a user in '''
    def post(self):
        payload = request.get_json()
        return dumps(
            auth_login(payload['username'], payload['password'])
        ), 200

@auth_ns.param('token', 'user token')
@auth_ns.response(200, 'Success')
@auth_ns.route("/logout")
class auth_logout_root(Resource):
    ''' Logs out a user '''
    def post(self):
        payload = request.get_json()
        return dumps(
            auth_logout(payload['token'])
        ), 200

##### RECIPE ROUTE #####
recipe_ns = api.namespace("recipe", description='Recipe operations')

@recipe_ns.param('token', 'user token')
@recipe_ns.param('title', 'recipe title')
@recipe_ns.param('intro', 'recipe intro')
@recipe_ns.param('photo', 'recipe photo')
@recipe_ns.param('difficulty', 'recipe difficulty')
@recipe_ns.param('cooktime', 'recipe cook time')
@recipe_ns.param('preptime', 'recipe prep time')
@recipe_ns.param('serves', 'recipe number of serves')
@recipe_ns.param('ingredients', 'recipe ingredients')
@recipe_ns.param('steps', 'recipe steps')
@recipe_ns.response(200, 'Success')
@recipe_ns.route("/view")
class recipe_view_root(Resource):
    ''' Return recipe information '''
    def get(self):
        recipe_id = request.args.get('recipe_id')
        return dumps(
            recipe_view(recipe_id)
        ), 200

@recipe_ns.param('token', 'user token')
@recipe_ns.param('title', 'recipe title')
@recipe_ns.param('intro', 'recipe intro')
@recipe_ns.param('photo', 'recipe photo')
@recipe_ns.param('difficulty', 'recipe difficulty')
@recipe_ns.param('cooktime', 'recipe cook time')
@recipe_ns.param('preptime', 'recipe prep time')
@recipe_ns.param('serves', 'recipe number of serves')
@recipe_ns.param('ingredients', 'recipe ingredients')
@recipe_ns.param('steps', 'recipe steps')
@recipe_ns.response(200, 'Success')
@recipe_ns.route("/upload")
class recipe_upload_root(Resource):
    ''' Register User '''
    def post(self):
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
        ), 200

@recipe_ns.response(200, 'Success')
@recipe_ns.route("/listall")
class recipe_list_all_root(Resource):
    ''' Return recipe information '''
    def get(self):
        return dumps(
            recipe_listall()
        ), 200


##### PRODUCT ROUTE #####
product_ns = api.namespace("product", description='Product operations')

@product_ns.param('token', 'user token')
@product_ns.param('title', 'product title')
@product_ns.param('photo', 'product photo')
@product_ns.param('title', 'product title')
@product_ns.param('description', 'product description')
@product_ns.param('labels', 'product labels')
@product_ns.response(200, 'Success')
@product_ns.route("/add")
class product_add_root(Resource):
    ''' Adds a product '''
    def post(self):
        payload = request.get_json()
        token = payload['token']
        title = payload['title']
        photo = payload['photo']
        description = payload['description']
        labels = payload['labels']
        return dumps(
            product_add(token, title, photo, description, labels)
        ), 200

    
##### CART ROUTE #####
cart_ns = api.namespace("cart", description='Cart operations')

@cart_ns.param('token', 'user token')
@cart_ns.param('list_items', 'list of items to add to cart')
@cart_ns.response(200, 'Success')
@cart_ns.route("/add")
class add_to_cart_root(Resource):
    ''' Add product to shopping cart '''
    def post(self):
        payload = request.get_json()
        token = payload['token']
        list_items = payload['ingredients']
        return dumps(
            cart_add(token, list_items)
        ), 200

@cart_ns.param('token', 'user token')
@cart_ns.param('item', 'item to remove from cart')
@cart_ns.response(200, 'Success')
@cart_ns.route("/remove")
class remove_from_cart_root(Resource):
    ''' Remove product from shopping cart '''
    def post(self):
        payload = request.get_json()
        token = payload['token']
        item = payload['ingredients']
        return dumps(
            cart_remove(token, item)
        ), 200

##### PROFILE ROUTE #####
profile_ns = api.namespace("profile", description='Profile operations')

@profile_ns.param('token', 'user token')
@profile_ns.param('user_id', 'user id to be viewed')
@profile_ns.response(200, 'Success')
@profile_ns.route("/remove")
class profile_view_root(Resource):
    ''' View profile '''
    def get():
        token = request.args.get('token')
        user_id = request.args.get('user_id')
        return dumps(
            profile_view(token, user_id)
        )


if __name__ == "__main__":
    APP.run()
