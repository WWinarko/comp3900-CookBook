import database
import recipe_helper
import auth_helper
from error import AccessError
from bson.objectid import ObjectId

def recipe_view(recipe_id):
    ''' view a recipe '''
    recipes = database.get_recipes()
    # check if the recipe exists
    if not recipe_helper.check_recipe_exist(ObjectId(recipe_id), recipes):
        raise AccessError(description="recipe does not exist")

    recipe = recipes.find_one({"_id":ObjectId(recipe_id)})

    title = recipe['title']
    intro = recipe['intro']
    photo = recipe['photo']
    sold = recipe['sold']
    difficulty = recipe['difficulty']
    cooktime = recipe['cooktime']
    preptime = recipe['preptime']
    serves = recipe['serves']
    ingredients = recipe['ingredients']
    labels = recipe['labels']
    owner_id = recipe['owner_id']
    rating = 0
    counter = 0
    for comment in recipe['comment']:
        rating += comment['rating']
        counter += 1
    if counter == 0:
        rating = 0
    else:
        rating = rating/counter
    # ingredient_string = []
    # for ingredient in ingredients:
    #     ingredient_string.append(ingredient['ingredient'])
    steps = recipe['steps']

    users = database.get_users()
    owner_id = recipe['owner_id']

    # check if the user exists
    if not auth_helper.check_user_id(ObjectId(owner_id), users):
        raise AccessError(description="user does not exist")
    owner = users.find_one({"_id":ObjectId(owner_id)})
    
    # if the owner is admin no follower numbershows up
    if owner['admin']:
        owner_username = "admin"
        owner_follower = -1
        owner_photo = ""
    else:
        owner_username = owner['username']
        owner_follower = owner['follower']
        owner_photo = owner['photo']
    # return the recipe details
    return {
        'title': title,
        'intro': intro,
        'photo': photo,
        'sold': sold,
        'difficulty': difficulty,
        'rating': rating,
        'cooktime': cooktime,
        'preptime': preptime,
        'serves': serves,
        'owner_username': owner_username,
        'owner_follower': owner_follower,
        'owner_photo': owner_photo, 
        'ingredients': ingredients,
        'steps': steps,
        'labels': labels,
        'owner_id': owner_id
    }

# recipes = database.get_recipes()
# recipe = recipes.find_one({"title":"yummy chicken"})
# print(recipe_view(recipe['_id']))

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
            }
        ]
    'steps':
        [
            
        ]
}
'''