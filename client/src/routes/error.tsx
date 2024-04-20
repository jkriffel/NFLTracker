import HomeLink from "../components/HomeLink";

function Error() {
  return (
    <div className="flex flex-col gap-2 items-center p-4 rounded-xl bg-Corp2">
      <h1 className="text-4xl">Error: 400 Bad Request</h1>
      <p>!! Please navigate to the home page and try again !!</p>
      <HomeLink />
    </div>
  );
}

export default Error;
