import type { ButtonProps } from "./button.types";

const Button = ({
  type,
  className,
  onClick,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
