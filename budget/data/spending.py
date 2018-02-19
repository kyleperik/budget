from .models import Spending, BudgetCategory, db
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

def get(timeperiodid=None, day=None, days=None):
    initialQuery = db.session.query(Spending).join(BudgetCategory).filter(
        BudgetCategory.timeperiodid == timeperiodid
    )
    spending = (
        initialQuery.filter(
            Spending.day_of_month > day - days,
            Spending.day_of_month <= day
        )
        if day != None
        else initialQuery
    ).all()
    return [dm.Spending(
        id = s.id,
        description = s.description,
        amount = s.amount,
        day_of_month = s.day_of_month,
        budget_categoryid = s.budget_categoryid,
    ) for s in spending]

def delete(id):
    spending = (
        db.session.query(Spending)
        .filter(Spending.id == id)
    ).delete()
    db.session.commit()
