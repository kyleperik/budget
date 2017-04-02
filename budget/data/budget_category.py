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









