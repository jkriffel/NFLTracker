import HomeLink from "../../components/HomeLink";
import Header from "../../components/Header";

import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

function getTeamData() {
  return useQuery("allTeams", async () => {
    const response = await axios.get("http://127.0.0.1:5000/showTeams");
    return response.data;
  });
}

type Team = {
  TeamID: number;
  Location: string;
  Nickname: string;
  Conference: string;
  Division: string;
  Wins: number;
  TotalGames: number;
};

type TeamTableProps = {
  teams: Team[];
};

function TeamTable({ teams }: TeamTableProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-col gap-2">
        {teams.map((team: Team) => {
          return (
            <div
              key={team.TeamID}
              className="justify-center w-full max-w-[15rem] bg-Corp3 rounded-xl p-4 items-center transition-colors hover:bg-Corp4 focus:outline-none "
            >
              <p>{team.Nickname}</p>
              <p>{team.Division}</p>
              <p>{team.Wins}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShowTeams() {
  const response = getTeamData();

  if (response.isLoading || response.data === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-2 items-center">
      <Header name="Show All Teams" />
      <TeamTable teams={response.data} />
      <HomeLink />
    </div>
  );
}

export default ShowTeams;
