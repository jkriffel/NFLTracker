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

function getPlayers(teamId: number) {
  return useQuery("players", async () => {
    const response = await axios.get(
      `http://127.0.0.1:5000/getPlayers/${teamId}`
    );
    return response.data;
  });
}

type Player = {
  TeamID: number;
  PlayerID: number;
  Name: string;
  Position: string;
};

type PlayerTableProps = {
  teamID: number;
};

function PlayerTable({ teamID }: PlayerTableProps) {
  const response = getPlayers(teamID);

  if (response.isLoading) {
    return <div>Loading...</div>;
  }

  const players = response.data;

  return (
    <div className="grid grid-cols-3 gap-2">
      {players.map((player: Player) => {
        return (
          <div
            key={player.PlayerID}
            // className="justify-center bg-Corp3 rounded-xl p-2 items-center transition-colors min-w-[10rem]"
            className="flex flex-col items-center bg-Nature2 rounded-xl p-2"
          >
            <p>{player.Name}</p>
            <p>{player.Position}</p>
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
      <p>Select a team you would like to see players from!!!</p>
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
      {selectedID !== 0 && <PlayerTable teamID={selectedID} />}
    </div>
  );
}

//TODO Find a way to refetch on button click, so it does not take FOREVER TO LOAD

function ShowPlayers() {
  const response = getTeams();

  if (response.isLoading) {
    return <div>Loading...</div>;
  }

  const teams = response.data;
  return (
    <div className="flex flex-col gap-5 items-center">
      <Header name="Show Players" />
      <TeamTable teams={teams} />
      <HomeLink />
    </div>
  );
}

export default ShowPlayers;
