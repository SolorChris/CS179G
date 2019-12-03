from flask import Flask
from flask import request
from flask import jsonify
import sys
from flask_cors import CORS
from processimages import runocr
from processimages import deleteimages
app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET','POST'])
def hello():
    filename=request.args.get('filename')
    # data = []
    data = runocr(filename)
    deleteimages()
    print(filename, file=sys.stdout)
    print(data, file=sys.stdout)
    return data


if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
