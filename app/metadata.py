from flask import (
    Blueprint,
    render_template
)

bp = Blueprint('metadata',__name__)

@bp.route('/metadata')
def metadata():
    return render_template('metadata/metadata.html')