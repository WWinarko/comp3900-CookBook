import pandas as pd
import cart_retrieve

def email_order_details(token):
    ''' Return order details (ingredients) in dataframe format and total '''

    # Obtain ingredients list and total from shopping cart
    cart = cart_retrieve.cart_retrieve(token)
    ingredients = cart["ingredients"]
    total = cart["total"]

    # Convert list into dataframe
    product, quantity, subtotal = [], [], []
    for ingredient in ingredients:
        product.append(ingredient["title"])
        quantity.append(ingredient["quantity"])
        subtotal.append("${:.2f}".format(ingredient["subtotal"]))
    df_ingredients = pd.concat([pd.DataFrame(product), pd.DataFrame(quantity), pd.DataFrame(subtotal)], axis=1)
    df_ingredients.columns = ["Product", "Quantity", "Subtotal"]

    return total, df_ingredients

'''
# Testing
token = "b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRldGltZSI6IjIwMjEtMTEtMDEgMTY6NTY6MTAuNzIzMTkzIiwicmFuZG9tbnVtYmVyIjoiMC4xOTc5MTg4NDY2OTA2NzcyNyJ9.kJxOyLv0w2Nq7WZ1KdgTxY_2jKhJprOBriiY33zykZY'"
total, ingredients = email_order_details(token)
email_send(ingredients, total, str(123454878), "maniga2575@hotmail.com", "Maria", "Sydney", "NSW", "2000")
'''