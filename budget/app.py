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

def vue_template(path):
    return open(os.path.join(SITE_ROOT, 'vues', path)).read()

@app.route('/')
def categories():
    categories = data.budget_category.get_for(1)
    return render_template(
        'layout.html',
        vue = vue_template('categories.html'),
        jsfilename = 'categories.js',
        model = {
            'categories': [c.serialize() for c in categories],
        }
    )
