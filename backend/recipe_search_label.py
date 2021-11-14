import database
def recipe_search_label(label):
    ''' list all the recipes with the given label '''
    recipes = database.get_recipes()
    recipe_list = list(recipes.find())
    recipe_ids = []

    for recipe in recipe_list:
        for recipe_label in recipe['labels']:
            if recipe_label == label:
                recipe_ids.append(str(recipe['_id']))

    return {
        "recipe_ids":recipe_ids
    }