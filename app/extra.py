from flask import (
    Blueprint,
    render_template
)

bp = Blueprint('extra',__name__)

@bp.route('/interesting')
def extra():
    return render_template('extra/extra.html')