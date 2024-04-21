import HomeLink from "../../components/HomeLink";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import Header from "../../components/Header";
import { useState } from "react";

function addGame() {
  // State variable to store form data, and not use refs
  const [formData, setFormData] = useState({
    Game_ID: "",
    Team_1_ID: "",
    Team_2_ID: "",
    Score_1: "",
    Score_2: "",
    Date: "",
  });

  // Function to handle input changes for all input fields
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent default form submission

    // Check if all fields are filled
    if (
      !formData.Game_ID ||
      !formData.Team_1_ID ||
      !formData.Team_2_ID ||
      !formData.Score_1 ||
      !formData.Score_2 ||
      !formData.Date
    ) {
      alert("Please fill all the fields");
      return;
    }
    // API Call to add a game
    //TODO Add the api
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
