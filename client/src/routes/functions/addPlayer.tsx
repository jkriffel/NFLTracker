import HomeLink from "../../components/HomeLink";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";

function addPlayerAPI(
  playerId: number,
  teamId: number,
  playerName: string,
  playerPos: string
) {
  return axios.get(`http://127.0.0.1:5000/addPlayer`, {
    params: {
      playerId,
      teamId,
      playerName,
      playerPos,
    },
  });
}

function addPlayer() {
  const [formData, setFormData] = useState({
    playerId: "",
    teamId: "",
    playerName: "",
    playerPos: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (
      !formData.playerId ||
      !formData.teamId ||
      !formData.playerName ||
      !formData.playerPos
    ) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const response = await addPlayerAPI(
        parseInt(formData.playerId),
        parseInt(formData.teamId),
        formData.playerName,
        formData.playerPos
      );

      setLoading(false);
      setSuccess(true);
      setFormData({
        playerId: "",
        teamId: "",
        playerName: "",
        playerPos: "",
      });
    } catch (error) {
      setLoading(false);
      setError({
        error: true,
        message: "Unable to Add player for unforeseen circumstances :)",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center p-4 rounded-xl">
      <Header name="Add a Player" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center bg-Corp3 p-4 rounded-xl min-w-[15rem]"
      >
        <Input
          name="playerId"
          value={formData.playerId}
          onChange={handleChange}
        />
        <Input name="teamId" value={formData.teamId} onChange={handleChange} />
        <Input
          name="playerName"
          value={formData.playerName}
          onChange={handleChange}
        />
        <Input
          name="playerPos"
          value={formData.playerPos}
          onChange={handleChange}
        />
        <SubmitButton />
      </form>

      {loading && <div>Loading...</div>}
      {error.error && <div>{error.message}</div>}
      {success && <div>Player Added Successfully</div>}
      <HomeLink />
    </div>
  );
}

export default addPlayer;
