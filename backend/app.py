from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random

app = Flask(__name__)
CORS(app)

# Load the CSV data once at app start
df = pd.read_csv("../Database/cards.csv")

#  Endpoint: Get x random cards (default: 10), optionally filter by category
@app.route('/cards', methods=['GET'])
def get_random_cards():
    category = request.args.get('category', 'All')
    num_cards = int(request.args.get('n', 10))

    filtered_df = df if category == 'All' else df[df['Category'] == category]

    # Randomly sample without replacement (min to avoid crash)
    sample = filtered_df.sample(min(num_cards, len(filtered_df))).to_dict(orient='records')
    return jsonify(sample)


# Endpoint: Get all cards for a given category (default = All)
@app.route('/cards/category', methods=['GET'])
def get_cards_by_category():
    category = request.args.get('category', 'All')
    filtered_df = df if category == 'All' else df[df['Category'] == category]
    return jsonify(filtered_df.to_dict(orient='records'))


# Endpoint: Get unique list of categories
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = df['Category'].dropna().unique().tolist()
    categories.sort()
    return jsonify(categories)


if __name__ == '__main__':
    app.run(debug=True)

