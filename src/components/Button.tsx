type ButtonProps = {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  disable?: boolean;
};

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
