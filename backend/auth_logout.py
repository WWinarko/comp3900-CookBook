from error import AccessError, InputError
import token_helper
import database

def auth_logout(token):
    ''' logout a user '''
    users = database.get_users()

    try:
        if token_helper.is_token_valid(token, users):
            token_helper.invalidate_token(token, users)
            return {'is_success': True}
    except AccessError:
        return {'is_success': False}
    except:
        raise InputError(description='An unknown error occured invalidating the token')