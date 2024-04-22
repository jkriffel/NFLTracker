from flask import Flask,jsonify
from flask_cors import CORS, cross_origin
import pymysql
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
# CORS(app, origins="http://localhost:5173")

@app.route('/')
# @cross_origin()
def index():
    return {"home": ["homevar", "homevar2", "homevar3"]}

@app.route('/members')
# @cross_origin()
def members():
    return {"members": ["member1", "member2", "member3"]}


@app.route("/query")
# @cross_origin()
def execute_query():
    try:
        # Connect to the database
        db = pymysql.connect(
        host = os.environ.get('RDS_HOST'),
        user = os.environ.get('RDS_USER'),
        password = os.environ.get('RDS_PASS'),
        database = os.environ.get('RDS_NAME'),
        port = int(os.environ.get('RDS_PORT'))
        )

        with db:
            # Create a cursor object
            with db.cursor() as cursor:
                # Execute the SELECT statement
                cursor.execute("SELECT * FROM player")
                
                # Fetch all the rows
                rows = cursor.fetchall()
                
                # Close the cursor and connection
                cursor.close()
        
        # Return the results as JSON
        return jsonify(rows)
    
    except Exception as e:
        return jsonify({"error": str(e)})
    
if __name__ == '__main__':
    app.run(debug=True, port=5432)