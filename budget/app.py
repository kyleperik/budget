from flask import Flask, jsonify, render_template, request

import budget.data.models
import budget.domain.models

import budget.data.budget_category
import budget.data.spending

from budget import data
from budget import domain
from budget.data.models import db

import os

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('BUDGET_SETTINGS')

db.init_app(app)

@app.route('/')
def index():
    return render_template('layout.html')

@app.route('/budget/')
def budgets():
    categories = data.budget_category.get_for(1)
    return jsonify([c.serialize() for c in categories])

@app.route('/spending', methods=['POST'])
def spending():
    r = request.json
    s = domain.models.Spending(
        amount = r['amount'],
        description = r['description'],
        budget_categoryid = r['budget_categoryid'],
        day_of_month = r['day_of_month']
    )
    return str(data.spending.save(s))

@app.route('/spending', methods=['GET'])
def get_spending():
    spending = data.spending.get()
    return jsonify([s.serialize() for s in spending])