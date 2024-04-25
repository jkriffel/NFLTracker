import HomeLink from "../../components/HomeLink";
import Header from "../../components/Header";

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
  let northArray = teams.filter((team) => team.Division === "North");
  let southArray = teams.filter((team) => team.Division === "South");
  let eastArray = teams.filter((team) => team.Division === "East");
  let westArray = teams.filter((team) => team.Division === "West");

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2">
          <p>North Conference</p>
          {northArray.map((team: Team) => {
            return (
              <div
                key={team.TeamID}
                className="justify-center w-full max-w-[15rem] bg-Corp3 rounded-xl p-4 items-center transition-colors hover:bg-Corp4 focus:outline-none "
              >
                <p>{team.Location + " " + team.Nickname}</p>
                <p>{"Wins: " + team.Wins}</p>
                <p>{"Total Games: " + team.TotalGames}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <p>South Conference</p>
          {southArray.map((team: Team) => {
            return (
              <div
                key={team.TeamID}
                className="justify-center w-full max-w-[15rem] bg-Corp3 rounded-xl p-4 items-center transition-colors hover:bg-Corp4 focus:outline-none "
              >
                <p>{team.Location + " " + team.Nickname}</p>
                <p>{"Wins: " + team.Wins}</p>
                <p>{"Total Games: " + team.TotalGames}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <p>East Conference</p>
          {eastArray.map((team: Team) => {
            return (
              <div
                key={team.TeamID}
                className="justify-center w-full max-w-[15rem] bg-Corp3 rounded-xl p-4 items-center transition-colors hover:bg-Corp4 focus:outline-none "
              >
                <p>{team.Location + " " + team.Nickname}</p>
                <p>{"Wins: " + team.Wins}</p>
                <p>{"Total Games: " + team.TotalGames}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <p>West Conference</p>
          {westArray.map((team: Team) => {
            return (
              <div
                key={team.TeamID}
                className="justify-center w-full max-w-[15rem] bg-Corp3 rounded-xl p-4 items-center transition-colors hover:bg-Corp4 focus:outline-none "
              >
                <p>{team.Location + " " + team.Nickname}</p>
                <p>{"Wins: " + team.Wins}</p>
                <p>{"Total Games: " + team.TotalGames}</p>
              </div>
            );
          })}
        </div>
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
