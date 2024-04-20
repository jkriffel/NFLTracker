import footballImage from "../images/american-football.png";
import footballHelmet from "../images/football-helmet.png";
import background from "../images/background3.avif";

type NavProps = {
  name: string;
  path: string;
  icon?: string;
};

function NavLink({ name, path }: NavProps) {
  return (
    <button
      className="flex flex-row justify-center gap-1 w-full max-w-[20rem] bg-Corp3 rounded-xl p-4 items-center transition-colors hover:bg-Corp4 focus:outline-none"
      onClick={() => {
        window.location.href = path;
      }}
    >
      <p>{name}</p>
    </button>
  );
}

function Home() {
  const navigation = [
    { name: "Add a Game", path: "/addGame" },
    { name: "Add a Player", path: "/addPlayer" },
    { name: "View Players", path: "/showPlayers" },
    { name: "View Position Players", path: "/showPosPlayers" },
    { name: "View Teams", path: "/showTeams" },
    { name: "View Game Records", path: "/showRecords" },
    { name: "View Game Records / Date", path: "/showDatedRecords" },
    { name: "Bonus", path: "/bonus" },
  ];

  const mainDivStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="flex flex-col gap-2 items-center p-4 rounded-xl min-h-[100vh]"
      style={mainDivStyle}
    >
      <div className="flex flex-col gap-2 items-center p-4 rounded-xl bg-Corp2 opacity-96">
        <div className="flex flex-row gap-2 items-center">
          <img src={footballImage} width="50" height="50" />
          <h1 className="text-4xl">Navigation Menu</h1>
          <img src={footballHelmet} width="50" height="50" />
        </div>

        {navigation.map((nav, index) => (
          <NavLink key={index} name={nav.name} path={nav.path} />
        ))}
      </div>
    </div>
  );
}

// const [data, setData] = useState();

// useEffect(() => {
//   const data = async () => {
//     try {
//       const data = await axios.get(`http://127.0.0.1:5000/members`);
//       setData(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   data();
// });

// console.log(data);

export default Home;
