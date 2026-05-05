import type { ButtonProps } from "./button.types";

const Button = ({
  type,
  className,
  onClick,
  children,
  disable,
}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disable}
    >
      {children}
    </button>
  );
};
export default Button;
