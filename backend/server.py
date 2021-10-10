from flask import Flask, request
from flask_cors import CORS

def default_handler(err):
    ''' Default Handle '''

APP = Flask(__name__)
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, default_handler)


@APP.route("/auth/login", methods=['POST'])
def auth_login_root():
    pass

if __name__ == "__main__":
    pass