from flask import Flask,jsonify,request
from flask_cors import CORS, cross_origin
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

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
@cross_origin()
def index():
    return {"home": ["homevar", "homevar2", "homevar3"]}

#!! DONE !!#
# This gets all teams from the database
@app.route('/getTeams')
@cross_origin()
def getTeams():
    try:
        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # Execute a query to select players from the specified team
        cursor.execute("SELECT * FROM team")

        # Fetch all the rows
        rows = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the results to JSON
        results = [{"TeamID": row[0], "Location": row[1], "Nickname": row[2], "Conf": row[3], "Division": row[4]} for row in rows]
        return jsonify(results)
    
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 500

#!! DONE !!#
# This takes a teamId and returns all the players in that team
@app.route('/getPlayers/<string:teamId>')
@cross_origin()
def getPlayers(teamId):
    try:
        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # Execute a query to select players from the specified team
        cursor.execute("SELECT * FROM player WHERE teamid = %s", (teamId))

        # Fetch all the rows
        rows = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the results to JSON
        results = [{"PlayerID": row[0], "TeamID": row[1], "Name": row[2], "Position": row[3]} for row in rows]
        return jsonify(results)
    
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 500
    
#!! DONE !!#
@app.route('/addPlayer')
@cross_origin()
def addPlayer():
    try:
        # Extract parameters from the query string
        playerId = request.args.get('playerId')
        teamId = request.args.get('teamId')
        playerName = request.args.get('playerName')
        playerPos = request.args.get('playerPos')

        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # Execute the INSERT query
        cursor.execute("INSERT INTO PLAYER VALUES(%s, %s, %s, %s)", (playerId, teamId, playerName, playerPos))

        # Commit the transaction
        connection.commit()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Return success message
        return jsonify({"message": "Player added successfully."}), 200
    
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 500


    
if __name__ == '__main__':
    app.run(debug=True, port=5432)