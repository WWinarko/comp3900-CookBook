import database

def recipe_listall():
    ''' list all the recipes '''
    recipes = database.get_recipes()
    recipe_list = list(recipes.find())
    sorted_list = sorted(recipe_list, key=lambda d: d['sold'])
    recipe_list = []
    for recipe in sorted_list:
        recipe_list.append(str(recipe['_id']))
    recipe_list.reverse()
    return {
        "recipe_list":recipe_list
    }
    
# print(recipe_listall())