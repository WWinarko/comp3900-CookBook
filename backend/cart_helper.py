def find_ingredient(cart, item):
    ''' Find ingredient from the shopping cart '''
    cart_ingredients = cart["ingredients"]
    for ingredient in cart_ingredients:
        if item["_id"] == ingredient["_id"]:
            return ingredient
    return None