class BudgetCategory:
    def __init__(self, id=None, name=None, amount=None, spending=[]):
        self.id = id
        self.name = name
        self.amount = amount
        self.spending = spending
        
    @property
    def total_spending(self):
        return sum(self.spending)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': float(self.amount),
            'total_spending': float(self.total_spending),
        }

class Spending:
    def __init__(self, id=None, amount=None,
                 description=None, day_of_month=None):
        self.amount = amount
        self.description = description
        self.day_of_month = day_of_month

    def serialize(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'description': self.day_of_month,
            'day_of_month': self.day_of_month,
        }
