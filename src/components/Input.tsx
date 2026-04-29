type InputProps = {
  type: "text" | "radio" | "checkbox" | "email";
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  className: string;
  checked?: boolean;
};

const Input = ({
  type,
  placeholder,
  onChange,
  value,
  className,
  checked,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      checked={checked}
      onChange={onChange}
      value={value ?? ""}
      className={className}
    />
  );
};

export default Input;
