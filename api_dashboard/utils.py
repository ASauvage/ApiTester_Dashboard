import json
from .forms import SessionForm


def build_query(form: SessionForm) -> dict:
    if form.query.data:
        try:
            return json.loads(form.query.data)
        except json.JSONDecodeError as e:
            pass
    else:
        query = dict()

        if form.session_id.data:
            query['session_id'] = form.session_id.data
        if form.service.data:
            query['service'] = form.service.data
        if len(form.status.data) < 2:
            query['status'] = bool(form.status.data)
        if form.env.data:
            query['env'] = form.env.data

        return query


def percent_calc(val: int, total: int):
    try:
        return int(val / total * 100)
    except ZeroDivisionError:
        return 100
