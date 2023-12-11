from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    from . import index
    from . import map
    from . import contact
    from . import metadata
    from . import extra
    
    app.register_blueprint(index.bp)
    app.register_blueprint(map.bp)
    app.register_blueprint(contact.bp)
    app.register_blueprint(metadata.bp)
    app.register_blueprint(extra.bp)
    
    return app