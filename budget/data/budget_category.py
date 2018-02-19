from .models import BudgetCategory, Timeperiod, db
import budget.domain.models as dm

def get_for(timeperiodid):
    categories = (db.session.query(BudgetCategory)
                  .options(db.subqueryload(BudgetCategory.spending))
                  .filter(
                      BudgetCategory.timeperiodid == timeperiodid
                  )).all()
    return [dm.BudgetCategory(
        id = category.id,
        name = category.name,
        amount = category.amount,
        spending = (s.amount for s in category.spending),
    ) for category in categories]

def add(name, amount, timeperiodid):
    category = BudgetCategory(
        name = name,
        amount = amount,
        timeperiodid = timeperiodid
    )
    db.session.add(category)
    db.session.flush()
    categoryid = category.id
    db.session.commit()
    return categoryid

def delete(id):
    category = (
        db.session.query(BudgetCategory)
        .filter(BudgetCategory.id == id)
    ).first()
    db.session.remove(category)
    return db.session.commit()
