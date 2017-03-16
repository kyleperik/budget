class BudgetCategory:
    def __init__(self, id=None, name=None, amount=None):
        self.id = id
        self.name = name
        self.amount = amount

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
        }

class Spending:
    def __init__(self, description=None, day_of_month=None):
        self.description = description
        self.day_of_month = day_of_month

    def serialize(self):
        return {
            'description': self.id,
            'day_of_month': self.name,
        }
