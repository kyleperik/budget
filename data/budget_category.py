from .models import BudgetCategory, Timeperiod, db
import budget.domain.models as dm

def get_for(timeperiodid):
    categories = (db.session.query(BudgetCategory)
                  .filter(
                      BudgetCategory.timeperiodid == timeperiodid
                  )).all()
    return [dm.BudgetCategory(
        name = category.name,
        amount = category.amount
    ) for category in categories]









