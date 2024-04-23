import HomeLink from "../../components/HomeLink";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";

function addGameAPI(
  gameId: number,
  team1Id: number,
  team2Id: number,
  score1: string,
  score2: string,
  gameDate: string
) {
  return axios.get(`http://127.0.0.1:5000/addGame`, {
    params: {
      gameId,
      team1Id,
      team2Id,
      score1,
      score2,
      gameDate,
    },
  });
}

function addGame() {
  const [formData, setFormData] = useState({
    gameId: "",
    team1Id: "",
    team2Id: "",
    score1: "",
    score2: "",
    gameDate: "",
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
      !formData.gameId ||
      !formData.team1Id ||
      !formData.team2Id ||
      !formData.score1 ||
      !formData.score2 ||
      !formData.gameDate
    ) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const response = await addGameAPI(
        parseInt(formData.gameId),
        parseInt(formData.team1Id),
        parseInt(formData.team2Id),
        formData.score1,
        formData.score2,
        formData.gameDate
      );

      setLoading(false);
      setSuccess(true);
      setFormData({
        gameId: "",
        team1Id: "",
        team2Id: "",
        score1: "",
        score2: "",
        gameDate: "",
      });
    } catch (error) {
      setLoading(false);
      setError({
        error: true,
        message: "Unable to Add game for unforeseen circumstances :)",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center p-4 rounded-xl">
      <Header name="Add a Game" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center bg-Corp3 p-4 rounded-xl min-w-[15rem]"
      >
        <Input name="gameId" value={formData.gameId} onChange={handleChange} />
        <Input
          name="team1Id"
          value={formData.team1Id}
          onChange={handleChange}
        />
        <Input
          name="team2Id"
          value={formData.team2Id}
          onChange={handleChange}
        />
        <Input name="score1" value={formData.score1} onChange={handleChange} />
        <Input name="score2" value={formData.score2} onChange={handleChange} />
        <Input
          name="gameDate"
          value={formData.gameDate}
          onChange={handleChange}
        />
        <SubmitButton />
      </form>

      {loading && <div>Loading...</div>}
      {error.error && <div>{error.message}</div>}
      {success && <div>Game Added Successfully</div>}
      <HomeLink />
    </div>
  );
}

export default addGame;
