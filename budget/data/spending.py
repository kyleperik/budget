from .models import Spending, db
import budget.domain.models as dm

def save(spending):
    s = Spending(
        budget_categoryid = spending.budget_categoryid,
        amount = spending.amount,
        description = spending.description,
        day_of_month = spending.day_of_month
    )
    db.session.add(s)
    db.session.flush()
    id = s.id
    db.session.commit()
    return id

def get():
    spending = (db.session.query(Spending).all())
    return [dm.Spending(
        id = s.id,
        description = s.description,
        amount = s.amount,
        day_of_month = s.day_of_month,
        budget_categoryid = s.budget_categoryid,
    ) for s in spending]
