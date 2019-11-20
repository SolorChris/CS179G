from flask import Flask
from flask import request
from flask import jsonify
import sys
from processimages import runocr
app = Flask(__name__)

@app.route("/", methods=['GET','POST'])
def hello():
    r=request.get_json()
    data = runocr()
    print(data, file=sys.stdout)
    return data


if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)