import token_helper
import database

def id_check(token):
    users = database.get_users()

    token_helper.is_token_valid(token, users)
    
    return {
        "id":str(token_helper.find_user_id_from_token(token, users))
    }