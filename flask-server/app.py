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
    
#!! DONE !!#
@app.route('/addGame')
@cross_origin()
def addGame():
    try:
        # Extract parameters from the query string
        gameId = request.args.get('gameId')
        team1Id = request.args.get('team1Id')
        team2Id = request.args.get('team2Id')
        score1 = request.args.get('score1')
        score2 = request.args.get('score2')
        gameDate = request.args.get('gameDate')

        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # Execute the INSERT query
        cursor.execute("INSERT INTO GAME VALUES(%s, %s, %s, %s, %s, %s)", (gameId, team1Id, team2Id, score1, score2, gameDate))

        # Commit the transaction
        connection.commit()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Return success message
        return jsonify({"message": "Game added successfully."}), 200
    
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 500

# NEEDS TESTING - SHOW PLAYERS BY POSITION #
@app.route('/showPosPlayers', methods=['GET'])
@cross_origin()
def showPosPlayers():
    try:
        # Get position from query parameters
        playerPos = request.args.get('playerPos')
        
        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # Execute a query to select players by position
        cursor.execute("SELECT * FROM player WHERE position = %s", (playerPos,))
        
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

# NEEDS TESTING - SHOW PLAYERS BY CONFERENCE
@app.route('/showTeams', methods=['GET'])
@cross_origin()
def showTeams():
    try:
        
        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # NEED TO TEST THIS FUNCTION OUT
        cursor.execute("""
            SELECT 
                t.TeamID, 
                t.Location, 
                t.Nickname, 
                t.Conference, 
                t.Division,
                COUNT(CASE WHEN g.TeamId1 = t.TeamID AND g.Score1 > g.Score2 THEN 1 ELSE NULL END) +
                COUNT(CASE WHEN g.TeamId2 = t.TeamID AND g.Score2 > g.Score1 THEN 1 ELSE NULL END) AS Wins,
                COUNT(g.GameID) AS TotalGames
            FROM 
                team t
            LEFT JOIN 
                game g ON t.TeamID = g.TeamId1 OR t.TeamID = g.TeamId2
            GROUP BY 
                t.TeamID, t.Location, t.Nickname, t.Conference, t.Division
            ORDER BY 
                t.Conference ASC, Wins DESC, TotalGames DESC;
        """)
        
        # Fetch all the rows
        rows = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the results to JSON
        results = [{
            "TeamID": row[0],
            "Location": row[1],
            "Nickname": row[2],
            "Conference": row[3],
            "Division": row[4],
            "Wins": row[5],
            "TotalGames": row[6]
        } for row in rows]

        return jsonify(results)
    
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 500
    
    
# NEEDS TESTING - SHOW TEAM GAMES
@app.route('/showRecords/<int:teamId>', methods=['GET'])
@cross_origin()
def showRecords(teamId):
    try:
        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # Execute a query to select games played by the given team
        cursor.execute("""
            SELECT 
                t1.Location AS TeamLocation, 
                t1.Nickname AS TeamNickname, 
                t2.Location AS OpponentLocation, 
                t2.Nickname AS OpponentNickname,
                g.Date,
                g.Score1,
                g.Score2,
                CASE 
                    WHEN (g.TeamId1 = %s AND g.Score1 > g.Score2) OR (g.TeamId2 = %s AND g.Score2 > g.Score1) THEN 'Won'
                    ELSE 'Lost'
                END AS Result
            FROM 
                game g
            JOIN 
                team t1 ON g.TeamId1 = t1.TeamID
            JOIN 
                team t2 ON g.TeamId2 = t2.TeamID
            WHERE 
                g.TeamId1 = %s OR g.TeamId2 = %s
            ORDER BY 
                g.Date DESC;
        """, (teamId, teamId, teamId, teamId))
        
        # Fetch all the rows
        rows = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the results to JSON
        results = [{
            "TeamLocation": row[0],
            "TeamNickname": row[1],
            "OpponentLocation": row[2],
            "OpponentNickname": row[3],
            "Date": row[4].strftime('%Y-%m-%d'),  # Convert date to string
            "Score": f"{row[5]} - {row[6]}",  # Display score as "Score1 - Score2"
            "Result": row[7]
        } for row in rows]

        return jsonify(results)
    
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 500

@app.route('/showDatedRecords', methods=['GET'])
@cross_origin()
def showDatedRecords():
    try:
        # Get date from query parameters
        date = request.args.get('date')
        
        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # Execute a query to select games played on the given date
        cursor.execute("""
            SELECT 
                t1.Location AS Team1Location, 
                t1.Nickname AS Team1Nickname,
                t2.Location AS Team2Location,
                t2.Nickname AS Team2Nickname,
                g.Score1,
                g.Score2,
                CASE 
                    WHEN g.Score1 > g.Score2 THEN t1.Nickname
                    WHEN g.Score2 > g.Score1 THEN t2.Nickname
                    ELSE 'Draw'
                END AS Winner
            FROM 
                game g
            JOIN 
                team t1 ON g.TeamId1 = t1.TeamID
            JOIN 
                team t2 ON g.TeamId2 = t2.TeamID
            WHERE 
                g.Date = %s
            ORDER BY 
                Team1Nickname;
        """, (date,))
        
        # Fetch all the rows
        rows = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the results to JSON
        results = [{
            "Team1Location": row[0],
            "Team1Nickname": row[1],
            "Team2Location": row[2],
            "Team2Nickname": row[3],
            "Score": f"{row[4]} - {row[5]}",  # Display score as "Score1 - Score2"
            "Winner": row[6]
        } for row in rows]

        return jsonify(results)
    
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5432)