from flask import Flask, request
from flask_cors import CORS
from json import dumps

from auth_register import auth_register
from auth_login import auth_login
from auth_logout import auth_logout

def default_handler(err):
    ''' Default Handle '''

APP = Flask(__name__)
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, default_handler)


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

if __name__ == "__main__":
    pass