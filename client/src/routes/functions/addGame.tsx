import HomeLink from "../../components/HomeLink";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import Header from "../../components/Header";
import { useState } from "react";

function addGame() {
  const [formData, setFormData] = useState({
    Game_ID: "",
    Team_1_ID: "",
    Team_2_ID: "",
    Score_1: "",
    Score_2: "",
    Date: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Do something with the form data, like sending it to an API
    console.log(formData);
  };

  return (
    <div className="flex flex-col gap-2 items-center p-4 rounded-xl">
      <Header name="Add a Game" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center bg-Corp3 p-4 rounded-xl min-w-[15rem]"
      >
        <Input
          name="Game_ID"
          value={formData.Game_ID}
          onChange={handleChange}
        />
        <Input
          name="Team_1_ID"
          value={formData.Team_1_ID}
          onChange={handleChange}
        />
        <Input
          name="Team_2_ID"
          value={formData.Team_2_ID}
          onChange={handleChange}
        />
        <Input
          name="Score_1"
          value={formData.Score_1}
          onChange={handleChange}
        />
        <Input
          name="Score_2"
          value={formData.Score_2}
          onChange={handleChange}
        />
        <Input name="Date" value={formData.Date} onChange={handleChange} />
        <SubmitButton />
      </form>
      <HomeLink />
    </div>
  );
}

export default addGame;
