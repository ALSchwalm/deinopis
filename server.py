from flask import Flask, request, jsonify
from flask_cors import CORS

from utils import *

app = Flask(__name__)
CORS(app)

@app.route("/suggestions", methods=["POST"])
def post_suggestion():
    return jsonify(suggestions(request.json, None))

if __name__ == "__main__":
    app.run()
