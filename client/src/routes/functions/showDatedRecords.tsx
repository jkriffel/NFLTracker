import HomeLink from "../../components/HomeLink";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function getGames(date: string) {
  return useQuery("games", async () => {
    const response = await axios.get(
      `http://127.0.0.1:5000/showDatedRecords?date=${date}`
    );
    return response.data;
  });
}
type Game = {
  Team1Location: number;
  Team1Nickname: number;
  Team2Location: string;
  Team2Nickname: string;
  Score: string;
  Winner: string;
};

type GameTableProps = {
  date: string;
};

function GameTable({ date }: GameTableProps) {
  const response = getGames(date);

  if (response.isLoading || response.data === undefined) {
    return <div>Loading...</div>;
  }

  const games = response.data;

  return (
    <div className="grid grid-cols-3 gap-2">
      {games.map((game: Game) => {
        return (
          <div className="flex flex-col items-center bg-Nature3 gap-2 rounded-xl p-2">
            <div className="flex flex-row gap-2 items-center">
              <p>{game.Score}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div
                key={game.Team1Location + game.Team2Location}
                className="flex flex-col items-center bg-Nature2 rounded-xl p-2"
              >
                <p>{game.Team1Location + " " + game.Team1Nickname}</p>
              </div>
              <p>VS</p>
              <div
                key={game.Team1Location + game.Team2Location}
                className="flex flex-col items-center bg-Nature2 rounded-xl p-2"
              >
                <p>{game.Team2Location + " " + game.Team2Nickname}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ShowDatedRecords() {
  const [formData, setFormData] = useState("");

  const handleChange = (e: any) => {
    const { value } = e.target;
    setFormData(value);
  };

  console.log(formData);

  return (
    <div className="flex flex-col gap-5 items-center">
      <Header name="Show Game Records by Date" />
      <div className="bg-Corp3 rounded-xl min-w-[15rem] p-2">
        <Input name="Date" value={formData} onChange={handleChange} />
      </div>

      {formData !== "" && <GameTable date={formData} />}
      <HomeLink />
    </div>
  );
}

export default ShowDatedRecords;
