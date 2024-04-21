type InputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ name, value, onChange }: InputProps) {
  return (
    <label className="flex flex-col text-Corp1">
      {name}
      <input
        className="rounded-xl p-1 bg-Corp2"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
