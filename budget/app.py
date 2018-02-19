from flask import Flask, jsonify, render_template, request

import budget.data.models
import budget.domain.models

import budget.data.budget_category
import budget.data.spending
import budget.data.timeperiod

from budget import data
from budget import domain
from budget.data.models import db

import os

import re
from datetime import datetime

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('BUDGET_SETTINGS')

db.init_app(app)

@app.route('/')
def index():
    return render_template('layout.html')

@app.route('/budget/<timeperiodid>')
def budgets(timeperiodid=None):
    categories = data.budget_category.get_for(timeperiodid)
    return jsonify([c.serialize() for c in categories])

@app.route('/budget/', methods=['POST'])
def add_budget():
    budget = request.json
    return str(data.budget_category.add(
        name = budget['name'],
        amount = budget['amount'],
        timeperiodid = budget['timeperiodid']
    ))

@app.route('/budget/<int:id>', methods=['DELETE'])
def del_budget(id):
    return data.budget_category.delete(id)

@app.route('/spending/', methods=['POST'])
def spending():
    r = request.json
    s = domain.models.Spending(
        amount = r['amount'],
        description = r['description'],
        budget_categoryid = r['budget_categoryid'],
        day_of_month = r['day_of_month'],
    )
    return str(data.spending.save(s))

@app.route('/timeperiod/')
def timeperiod():
    timeperiods = data.timeperiod.get()
    return jsonify([t.serialize() for t in timeperiods])

@app.route('/timeperiod/', methods=['POST'])
def add_timeperiod():
    r = request.json
    return jsonify(data.timeperiod.add(domain.models.Timeperiod(
        month=r['month'],
        year=r['year']
    )))

@app.route('/spending/', methods=['GET'])
def get_spending_range():
    spending = data.spending.get()
    return jsonify([s.serialize() for s in spending])

@app.route('/spending/<int:timeperiodid>/<day_range>', methods=['GET'])
def get_spending(timeperiodid=None, day_range=None):
    groups = re.search(r'(\d*)-?(\d*)', day_range).groups()
    start, end = [int(g) for g in groups]
    todays_day = datetime.now().day
    day = todays_day - start
    days = end - start if end else 1
    spending = data.spending.get(timeperiodid=timeperiodid, day=day, days=days)
    return jsonify([s.serialize() for s in spending])


@app.route('/spending/<int:id>', methods=['DELETE'])
def del_spending(id):
    data.spending.delete(id)
    return ('', 204)
