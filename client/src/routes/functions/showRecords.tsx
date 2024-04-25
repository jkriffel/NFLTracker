import HomeLink from "../../components/HomeLink";
import Header from "../../components/Header";

import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

function getTeams() {
  return useQuery("teams", async () => {
    const response = await axios.get("http://127.0.0.1:5000/getTeams");
    return response.data;
  });
}

function getGames(teamId: number) {
  return useQuery("games", async () => {
    const response = await axios.get(
      `http://127.0.0.1:5000/showRecords/${teamId}`
    );
    return response.data;
  });
}

type Game = {
  Team1_Location: number;
  Team1_Nickname: number;
  Team2_Location: string;
  Team2_Nickname: string;
  Date: string;
  Score: string;
  Result: string;
};

type GameTableProps = {
  teamID: number;
};

function GameTable({ teamID }: GameTableProps) {
  const response = getGames(teamID);

  if (response.isLoading || response.data === undefined) {
    return <div>Loading...</div>;
  }

  const games = response.data;

  return (
    <div className="grid grid-cols-3 gap-2">
      {games.map((game: Game) => {
        let color = "bg-green-600";
        if (game.Result === "Lost") {
          color = "bg-red-300";
        }
        if (game.Result === "Draw") {
          color = "bg-Nature4";
        }
        return (
          <div className="flex flex-col items-center bg-Nature3 gap-2 rounded-xl p-2">
            <div className="flex flex-row gap-2 items-center">
              <p>{game.Date}</p>
              <p className={color + " rounded-xl p-1"}>{game.Score}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div
                key={game.Team1_Location + game.Team2_Location + game.Date}
                className="flex flex-col items-center bg-Nature2 rounded-xl p-2"
              >
                <p>{game.Team1_Location + " " + game.Team1_Nickname}</p>
              </div>
              <p>VS</p>
              <div
                key={game.Team1_Location + game.Team2_Location + game.Date}
                className="flex flex-col items-center bg-Nature2 rounded-xl p-2"
              >
                <p>{game.Team2_Location + " " + game.Team2_Nickname}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type Team = {
  TeamID: number;
  Location: string;
  Division: string;
  Conf: string;
  Nickname: string;
};

type TeamTableProps = {
  teams: Team[];
};

function TeamTable({ teams }: TeamTableProps) {
  const [selectedID, setSelectedID] = useState(0);

  return (
    <div className="flex flex-col gap-2 items-center">
      <p>Select a team you would like to see the games of!!!</p>
      <div className="grid grid-cols-3 gap-4">
        {teams.map((team: Team) => {
          let selectedColor = "";
          if (selectedID === team.TeamID) {
            selectedColor = "bg-Nature2";
          }
          return (
            <button
              key={team.TeamID}
              onClick={() => {
                setSelectedID(team.TeamID);
              }}
              className={
                "justify-center w-full max-w-[15rem] bg-Corp3 rounded-xl p-4 items-center transition-colors hover:bg-Corp4 focus:outline-none " +
                selectedColor
              }
            >
              {team.Nickname}
            </button>
          );
        })}
      </div>
      {selectedID !== 0 && <GameTable teamID={selectedID} />}
    </div>
  );
}

function ShowRecords() {
  const response = getTeams();

  if (response.isLoading || response.data === undefined) {
    return <div>Loading...</div>;
  }

  const teams = response.data;
  return (
    <div className="flex flex-col gap-5 items-center">
      <Header name="Show Game Records" />
      <TeamTable teams={teams} />
      <HomeLink />
    </div>
  );
}

export default ShowRecords;
