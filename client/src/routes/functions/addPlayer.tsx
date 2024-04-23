import HomeLink from "../../components/HomeLink";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import Header from "../../components/Header";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

type AddPlayerProps = {
  playerId: number;
  teamId: number;
  playerName: string;
  playerPos: string;
};

function addPlayerAPI(
  playerId: number,
  teamId: number,
  playerName: string,
  playerPos: string
) {
  return useQuery("addPlayer", async () => {
    const response = await axios.get(
      `http://127.0.0.1:5000/addPlayer?playerId=${playerId}&teamId=${teamId}&playerName=${playerName}&playerPos=${playerPos}`
    );
    return response.data;
  });
}

function addPlayer() {
  // State variable to store form data, and not use refs
  const [formData, setFormData] = useState({
    playerId: "",
    teamId: "",
    playerName: "",
    playerPos: "",
  });

  // Function to handle input changes for all input fields
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    // Check if all fields are filled
    if (
      !formData.playerId ||
      !formData.teamId ||
      !formData.playerName ||
      !formData.playerPos
    ) {
      alert("Please fill all the fields");
      return;
    }
    // API Call to add a player
    const data = addPlayerAPI(
      parseInt(formData.playerId),
      parseInt(formData.teamId),
      formData.playerName,
      formData.playerPos
    );

    setLoading(true);

    if (!data.isLoading) {
      setLoading(false);
      if (data.isError) {
        setError({
          error: true,
          message: "Unable to Add player for unforeseen circumstances :)",
        });
      }

      if (data.isSuccess) {
        setSuccess(true);
      }
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
