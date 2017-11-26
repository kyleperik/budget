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
                 description=None, day_of_month=None,
                 budget_categoryid=None):
        self.id = id
        self.amount = amount
        self.description = description
        self.day_of_month = day_of_month
        self.budget_categoryid = budget_categoryid
        
        
    def serialize(self):
        return {
            'id': self.id,
            'amount': str(self.amount),
            'description': self.description,
            'day_of_month': self.day_of_month,
            'budget_categoryid': self.budget_categoryid,
        }
