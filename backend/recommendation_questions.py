import database

def recommendation_questions(q1, q2, q3, q4, q5, q6):
    ''' recoommend recipes based on the answers of the questions '''
    answer_list = q1 + q2 + q3 + q4 + q5 + q6
    new_list = []
    for ele in answer_list:
        if not ele == '':
            new_list.append(ele)
    match = set(new_list)
    recipes = database.get_recipes()
    recipe_list = list(recipes.find())

    recipe_ids = []
    for recipe in recipe_list:
        recipe_labels = set(recipe['labels'])
        if match.issubset(recipe_labels):
            recipe_ids.append(str(recipe['_id']))
    return {
        "recipe_list":recipe_ids
    }