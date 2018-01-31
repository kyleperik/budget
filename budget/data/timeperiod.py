from .models import Timeperiod, db
from budget.domain import models as dm

def get():
    timeperiods = db.session.query(Timeperiod).all()
    return [
        dm.Timeperiod(
            tp.id,
            tp.month,
            tp.year
        ) for tp in timeperiods
    ]

def add(tp):
    timeperiod = Timeperiod(
        month = tp.month,
        year = tp.year,
    )
    db.session.add(timeperiod)
    db.session.flush()
    id = timeperiod.id
    db.session.commit()
    return id
    
