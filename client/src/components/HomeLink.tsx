function HomeLink() {
  return (
    <button
      className="flex flex-row justify-center gap-1 w-full max-w-[20rem] bg-Corp3 rounded-xl p-4 items-center transition-colors hover:bg-Corp4 focus:outline-none"
      onClick={() => {
        window.location.href = "/";
      }}
    >
      <p>{"Home"}</p>
    </button>
  );
}

export default HomeLink;
