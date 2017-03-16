from budget.domain import models

def test_budget_category_serialize():
    # -arrange-
    budget_category = models.BudgetCategory()
    
    # -act-
    result = budget_category.serialize()
    
    # -assert-
    assert result is not None
    
