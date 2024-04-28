from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import psycopg2
import os
from urllib.parse import urlparse

app = Flask(__name__)
CORS(app, origins=["https://nfl-frontend-git-main-james-riffels-projects.vercel.app", "https://cscedbfinal-git-master-zeandersons-projects.vercel.app"])

def get_db_connection():
    try:
        # Parse the database URL
        db_url = "postgres://khozesckjjquuh:60044915ebbd199711353a37ab20f58cd9ba3dbe08aef0787abc3d0d2a875bda@ec2-52-54-200-216.compute-1.amazonaws.com:5432/d6dpn5at6c3omd"
        parsed_url = urlparse(db_url)
        
        # Extract connection information from the parsed URL
        db_host = parsed_url.hostname
        db_port = parsed_url.port
        db_user = parsed_url.username
        db_password = parsed_url.password
        db_name = parsed_url.path.lstrip('/')
        
        # Establish a connection to the PostgreSQL database
        connection = psycopg2.connect(
            host=db_host,
            database=db_name,
            user=db_user,
            password=db_password,
            port=db_port
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

#!! DONE !!# 
# This gets all positions from the player Table in the database
@app.route('/getPositions')
@cross_origin()
def getPositions():
    try:
        # Establish a connection to the database
        connection = get_db_connection()
        if connection is None:
            return jsonify({"error": "Failed to connect to the database."}), 500
        
        # Create a cursor object
        cursor = connection.cursor()

        # Execute a query to select players from the specified team
        cursor.execute("SELECT DISTINCT playerpos from player")

        # Fetch all the rows
        rows = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the results to JSON
        results = [{"Position": row[0]} for row in rows]
        return jsonify(results)
    
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 500

#! DONE !# 
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
        cursor.execute("SELECT * FROM player WHERE playerpos = %s", (playerPos,))
        
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

#! Done !#
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
                t.teamid, 
                t.teamlocation, 
                t.nickname, 
                t.conference, 
                t.division,
                COUNT(CASE WHEN g.teamid1 = t.teamid AND g.score1 > g.score2 THEN 1 ELSE NULL END) +
                COUNT(CASE WHEN g.teamid2 = t.teamid AND g.score2 > g.score1 THEN 1 ELSE NULL END) AS Wins,
                COUNT(g.gameid) AS TotalGames
            FROM 
                team t
            LEFT JOIN 
                game g ON t.teamid = g.teamid1 OR t.teamid = g.teamid2
            GROUP BY 
                t.teamid, t.teamlocation, t.nickname, t.conference, t.division
            ORDER BY 
                t.conference ASC, Wins DESC, TotalGames DESC;
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
    
#SHOW RECORDS VERSION 5 ELECTRIC BOGALOO
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
        query = """
        SELECT 
            t1.teamlocation AS Team1Location, 
            t1.nickname AS Team1_Nickname, 
            t2.teamlocation AS Team2_Location, 
            t2.nickname AS Team2_Nickname,
            TO_CHAR(g.gamedate, 'YYYY-MM-DD') AS Date,
            g.score1 AS Score1,
            g.score2 AS Score2,
            CASE 
                WHEN CAST(g.score1 AS INTEGER) > CAST(g.score2 AS INTEGER) THEN 'Won'
                WHEN CAST(g.score2 AS INTEGER) > CAST(g.score1 AS INTEGER) THEN 'Lost'
                ELSE 'Draw'
            END AS Result
        FROM 
            game g
        JOIN 
            team t1 ON g.teamid1 = t1.teamid
        JOIN 
            team t2 ON g.teamid2 = t2.teamid
        WHERE 
            g.teamid1 = %s OR g.teamid2 = %s
        ORDER BY 
            g.gamedate DESC;
        """
        
        # Execute the query for the given teamId
        cursor.execute(query, (teamId, teamId))

        # Fetch all the rows
        rows = cursor.fetchall()

        # Close the cursor
        cursor.close()

        # Close the connection
        connection.close()

        # If no records found
        if not rows:
            return jsonify({"message": "No records found for the given team."}), 404

        # Convert the results to JSON
        results = [{
            "Team1_Location": row[0],
            "Team1_Nickname": row[1],
            "Team2_Location": row[2],
            "Team2_Nickname": row[3],
            "Date": row[4],
            "Score": f"{row[5]} - {row[6]}",
            "Result": row[7]
        } for row in rows]

        return jsonify(results)
    
    except psycopg2.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        # Ensure the connection is closed
        if connection:
            connection.close()




# !! DONE !!
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
            t1.teamlocation AS Team1Location, 
            t1.nickname AS Team1Nickname,
            t2.teamlocation AS Team2Location,
            t2.nickname AS Team2Nickname,
            g.score1 AS Score1,
            g.score2 AS Score2,
            CASE 
                WHEN g.score1 > g.score2 THEN t1.nickname
                WHEN g.score2 > g.score1 THEN t2.nickname
                ELSE 'Draw'
            END AS Winner
        FROM 
            game g
        JOIN 
            team t1 ON g.teamid1 = t1.teamid
        JOIN 
            team t2 ON g.teamid2 = t2.teamid
        WHERE 
            g.gamedate = %s
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
    app.run(debug=True)