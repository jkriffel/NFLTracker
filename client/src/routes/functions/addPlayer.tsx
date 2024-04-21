import HomeLink from "../../components/HomeLink";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import Header from "../../components/Header";
import { useState } from "react";

function addPlayer() {
  // State variable to store form data, and not use refs
  const [formData, setFormData] = useState({
    Player_ID: "",
    Team_ID: "",
    Name: "",
    Position: "",
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
      !formData.Player_ID ||
      !formData.Team_ID ||
      !formData.Name ||
      !formData.Position
    ) {
      alert("Please fill all the fields");
      return;
    }
    // API Call to add a player
    //TODO Add the api
    console.log(formData);
  };

  return (
    <div className="flex flex-col gap-2 items-center p-4 rounded-xl">
      <Header name="Add a Player" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center bg-Corp3 p-4 rounded-xl min-w-[15rem]"
      >
        <Input
          name="Player_ID"
          value={formData.Player_ID}
          onChange={handleChange}
        />
        <Input
          name="Team_ID"
          value={formData.Team_ID}
          onChange={handleChange}
        />
        <Input name="Name" value={formData.Name} onChange={handleChange} />
        <Input
          name="Position"
          value={formData.Position}
          onChange={handleChange}
        />
        <SubmitButton />
      </form>
      <HomeLink />
    </div>
  );
}

export default addPlayer;
