import HomeLink from "../../components/HomeLink";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

function getPositions() {
  return useQuery("positions", async () => {
    const response = await axios.get("http://127.0.0.1:5000/getPositions");
    return response.data;
  });
}

function getPosPlayers(pos: string) {
  return useQuery("posPlayers", async () => {
    const response = await axios.get(
      `http://127.0.0.1:5000/showPosPlayers?playerPos=${pos}`
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
  position: string;
};

function PlayerTable({ position }: PlayerTableProps) {
  const response = getPosPlayers(position);

  if (response.isLoading || response.data === undefined) {
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

type Position = {
  Position: string;
};

type PositionTableProps = {
  positions: Position[];
};

function PositionTable({ positions }: PositionTableProps) {
  const [selectedPosition, setSelectedPosition] = useState("");

  return (
    <div className="flex flex-col gap-2 items-center">
      <p>Select a position you would like to see players from!!!</p>
      <div className="grid grid-cols-3 gap-4">
        {positions.map((pos: Position) => {
          let selectedColor = "";
          if (selectedPosition === pos.Position) {
            selectedColor = "bg-Nature2";
          }
          return (
            <button
              key={pos.Position}
              onClick={() => {
                setSelectedPosition(pos.Position);
              }}
              className={
                "justify-center w-full max-w-[15rem] bg-Corp3 rounded-xl p-4 items-center transition-colors hover:bg-Corp4 focus:outline-none " +
                selectedColor
              }
            >
              {pos.Position}
            </button>
          );
        })}
      </div>
      {selectedPosition !== "" && <PlayerTable position={selectedPosition} />}
    </div>
  );
}

function ShowPosPlayers() {
  const response = getPositions();

  if (response.isLoading || response.data === undefined) {
    return <div>Loading...</div>;
  }

  const positions = response.data;

  return (
    <div className="flex flex-col gap-5 items-center">
      <Header name="Show Positions" />
      <PositionTable positions={positions} />
      <HomeLink />
    </div>
  );
}

export default ShowPosPlayers;
