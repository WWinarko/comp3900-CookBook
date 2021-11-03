import token_helper
import database

def admin_check(token):
    ''' Check if the user is an admin'''
    users = database.get_users()

    token_helper.is_token_valid(token, users)
    
    return {
        "admin":token_helper.check_admin(token, users)
    }