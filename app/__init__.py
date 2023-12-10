from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    from . import index
    from . import map
    from . import contact
    
    app.register_blueprint(index.bp)
    app.register_blueprint(map.bp)
    app.register_blueprint(contact.bp)
    
    return app