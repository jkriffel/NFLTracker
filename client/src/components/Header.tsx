type HeaderProps = {
  name: string;
};
function Header({ name }: HeaderProps) {
  return (
    <h1 className="text-xl text-Corp1 underline underline-offset-4">{name}</h1>
  );
}

export default Header;
