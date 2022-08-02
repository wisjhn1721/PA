
# PDM
from flask import Flask

app = Flask(__name__)

with app.app_context():
    # LOCAL
    from public import routes  # pylint: disable=import-outside-toplevel

    app.register_blueprint(routes.bp)
