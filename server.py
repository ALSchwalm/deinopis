from flask import Flask, request, jsonify
from flask_cors import CORS

from utils import *

app = Flask(__name__)
CORS(app)

@app.route("/suggestions", methods=["POST"])
def post_suggestion():
    resp = jsonify(suggestions(request.json, None))
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
