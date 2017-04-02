from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Timeperiod(db.Model):
    __tablename__ = 'timeperiod'
    id = db.Column(db.Integer, primary_key=True)
    month = db.Column(db.Integer)
    year = db.Column(db.Integer) 

    def __init__(self, id, month, year):
        self.id = id
        self.month = month
        self.year = year

class BudgetCategory(db.Model):
    __tablename__  = 'budget_category'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    amount = db.Column(db.Float)
    timeperiodid = db.Column(db.Integer,
                             db.ForeignKey('timeperiod.id'))
    
    spending = db.relationship('Spending')
    timeperiod = db.relationship('Timeperiod')

    def __init(self, id, name, amount, timeperiodid):
        self.id = id
        self.name = name
        self.amount = amount
        self.timeperiodid = timeperiodid

class Spending(db.Model):
    __tablename__ = 'spending'
    id = db.Column(db.Integer, primary_key=True)
    budget_categoryid = db.Column(db.Integer,
                                  db.ForeignKey('budget_category.id'))
    amount = db.Column(db.Float)
    description = db.Column(db.String(300))
    day_of_month = db.Column(db.Integer)

    budget_category = db.relationship('BudgetCategory')
    def __init__(self, budget_categoryid, amount, description, day_of_month):
        self.id = id
        self.budget_categoryid = budget_categoryid
        self.description = description
        self.day_of_month = day_of_month
