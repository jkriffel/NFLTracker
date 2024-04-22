from flask import Flask
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

@app.route('/')
@cross_origin()
def index():
    return {"home": ["homevar", "homevar2", "homevar3"]}

@app.route('/members')
@cross_origin()
def members():
    return {"members": ["member1", "member2", "member3"]}

if __name__ == '__main__':
    app.run(debug=True)