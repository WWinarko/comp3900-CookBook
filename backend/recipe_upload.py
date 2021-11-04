import argument_checker
import token_helper
import database
from error import InputError

def recipe_upload(token, title, intro, photo, difficulty, cooktime, preptime, serves, ingredients, steps, labels):
    ''' upload a recipe '''
    users = database.get_users()

    # check if the token is valid
    token_helper.is_token_valid(token, users)

    # check if the fields have arguments
    argument_checker.all_not_empty([title, intro, photo])
    
    # check if no input
    if (difficulty is None) or (cooktime is None) or (preptime is None) or (serves is None):
        raise InputError(description="no input for any of diffculty/cooktime/preptime/serves")

    # no empty step
    argument_checker.all_not_empty(steps)

    for ingredient in ingredients:
        if argument_checker.is_empty_string(ingredient['ingredient']):
            raise InputError(description="contains empty ingredient textfield")

    user = users.find_one({"token":token})
    owner_id = str(user['_id'])
    recipe = {
        "title":title,
        "intro":intro,
        "photo":photo,
        "sold":0,
        "difficulty":difficulty,
        "rating":0,
        "people_rated":0,
        "owner_id":owner_id,
        "cooktime":cooktime,
        "preptime":preptime,
        "serves":serves,
        "ingredients": ingredients,
        "steps":steps,
        "comment":[], 
        "labels":labels
    }

    recipes = database.get_recipes()
    result = recipes.insert_one(recipe)

    return {
        'recipe_id': str(result.inserted_id)
    }

# users = database.get_users()
# user = users.find_one({"username":"TrinaChang"})

# recipe_upload(
#     user['token'], 'popular recipe', 'dfsfsd', 'sfssd', 5, 30, 20, 4, 
#     [{'ingredient':'dfsfsdfsdf', 'product_id':'fsdfsfd'}, {'ingredient':'abcsdf', 'product_id':'adslsfd'}], 
#     ['sdfdsfsdfs', 'sfdfsdfsdfsfds', 'fsdfsdfsdsfdsfs'])

'''
recipe format:
{
    'title': 'sdfsfsds' (strip, not empty)
    'intro':
    'photo':
    'sold':
    'difficulty':
    'rating':
    'people_rated':
    'owner_id':
    'cooktime':
    'preptime':
    'serves':
    'ingredients':
        [
            {
                'ingredient':
                'product_id':
                'quantity':
                'compulsory':(True/False)
            }
        ]
    'steps':
        [
            
        ]
}
'''