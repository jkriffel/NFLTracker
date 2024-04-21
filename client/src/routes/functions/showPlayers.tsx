import HomeLink from "../../components/HomeLink";
import Header from "../../components/Header";

function PlayerTable() {
  // Array of players passed as props, to be displayed in a table
  return (
    <table>
      <tr>
        <th>Player ID</th>
        <th>Team ID</th>
        <th>Name</th>
        <th>Position</th>
      </tr>
      <tr>
        <td>1</td>
        <td>John</td>
        <td>Doe</td>
        <td>Team 1</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane</td>
        <td>Doe</td>
        <td>Team 2</td>
      </tr>
    </table>
  );
}

function ShowPlayers() {
  //TODO API call to get all teams
  // const [players, setPlayers] = useState([]);
  // When selecting a team, set the players state from the api call and pass into playertable to display
  return (
    <div className="flex flex-col gap-2 items-center">
      <Header name="Show Players" />
      <PlayerTable />
      <HomeLink />
    </div>
  );
}

export default ShowPlayers;
