import type { InputProps } from "./input.types";

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
