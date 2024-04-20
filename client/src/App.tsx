import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import addGame from "./routes/functions/addGame";
import addPlayer from "./routes/functions/addPlayer";
import ShowPlayers from "./routes/functions/showPlayers";
import ShowPosPlayers from "./routes/functions/showPosPlayers";
import ShowTeams from "./routes/functions/showTeams";
import ShowRecords from "./routes/functions/showRecords";
import ShowDatedRecords from "./routes/functions/showDatedRecords";
import Bonus from "./routes/functions/bonus";
import Error from "./routes/error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/addGame",
    Component: addGame,
  },
  {
    path: "/addPlayer",
    Component: addPlayer,
  },
  {
    path: "/showPlayers",
    Component: ShowPlayers,
  },
  {
    path: "/showPosPlayers",
    Component: ShowPosPlayers,
  },
  {
    path: "/showTeams",
    Component: ShowTeams,
  },
  {
    path: "/showRecords",
    Component: ShowRecords,
  },
  {
    path: "/showDatedRecords",
    Component: ShowDatedRecords,
  },
  {
    path: "/bonus",
    Component: Bonus,
  },
  {
    path: "*",
    Component: Error,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
