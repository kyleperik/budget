from flask import Flask, jsonify, render_template

import budget.data.models
import budget.domain.models

import budget.data.budget_category

from budget import data
from budget.data.models import db

import os

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('BUDGET_SETTINGS')

db.init_app(app)

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))

@app.route('/')
def index():
    return render_template(
        'layout.html',
        jsfilename = 'categories.js',
    )

@app.route('/budget/')
def budgets():
    categories = data.budget_category.get_for(1)
    return jsonify([c.serialize() for c in categories])
