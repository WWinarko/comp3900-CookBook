import database
import re
def recipe_search_keyword(keyword):
    ''' list all the recipes with the given keyword '''
    recipes = database.get_recipes()
    recipe_list = list(recipes.find())
    recipe_ids = []

    for recipe in recipe_list:
        if re.search(keyword, recipe['title']):
            recipe_ids.append(str(recipe['_id']))

    return {
        "recipe_ids":recipe_ids
    }
