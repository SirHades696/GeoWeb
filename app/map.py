from flask import (
    Blueprint,
    render_template
)

bp = Blueprint('map',__name__)

@bp.route('/map')
def map():
    return render_template('map/map.html')