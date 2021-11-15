import pandas as pd

def email_order_details(details):
    ''' Return order details (ingredients) in dataframe format and total '''

    # Obtain ingredients list and total from shopping cart
    ingredients = details["recipe_ingredients"]
    n_ingredients = len(ingredients)
    total = details["recipe_subtotal"]

    # Convert list into dataframe
    product, quantity, subtotal = [], [], []
    for ingredient in ingredients:
        product.append(ingredient["title"])
        quantity.append(ingredient["quantity"])
        subtotal.append("${:.2f}".format(ingredient["subtotal"]))
    df_ingredients = pd.concat([pd.DataFrame(product), pd.DataFrame(quantity), pd.DataFrame(subtotal)], axis=1)
    df_ingredients.columns = ["Product", "Quantity", "Subtotal"]

    return total, n_ingredients, df_ingredients

'''
# Testing
token = "b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDEgMTY6NTY6MTAuNzIzMTkzIiwicmFuZG9tbnVtYmVyIjoiMC4xOTc5MTg4NDY2OTA2NzcyNyJ9.kJxOyLv0w2Nq7WZ1KdgTxY_2jKhJprOBriiY33zykZY'"
total, ingredients = email_order_details(token)
email_send(ingredients, total, str(123454878), "maniga2575@hotmail.com", "Maria", "Sydney", "NSW", "2000")
'''