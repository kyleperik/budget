class BudgetCategory:
    def __init__(self, id=None, name=None, amount=None):
        self.id = id
        self.name = name
        self.amount = amount

    def serialize(self):
        import pdb; pdb.set_trace
        return {
            'id': self.id,
            'name': self.name,
            'amount': float(self.amount),
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
