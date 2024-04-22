from flask import Flask,jsonify
from flask_cors import CORS, cross_origin
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
# CORS(app, origins="http://localhost:5173")

def get_db_connection():
    try:
        # Establish a connection to the PostgreSQL database
        connection = psycopg2.connect(
            host=os.environ.get('RDS_HOST'),
            database=os.environ.get('RDS_NAME'),
            user=os.environ.get('RDS_USER'),
            password=os.environ.get('RDS_PASS'),
            port=os.environ.get('RDS_PORT')  
        )
        return connection
    except psycopg2.Error as e:
        print("Error while connecting to PostgreSQL:", e)
        return None


@app.route('/')
# @cross_origin()
def index():
    return {"home": ["homevar", "homevar2", "homevar3"]}

@app.route('/query')
def execute_query():
    try:
        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # Execute a sample query
        cursor.execute("SELECT * FROM player LIMIT 5")

        # Fetch all the rows
        rows = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the results to JSON
        results = [{"id": row[0], "name": row[1]} for row in rows]
        return jsonify(results)
    
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5432)