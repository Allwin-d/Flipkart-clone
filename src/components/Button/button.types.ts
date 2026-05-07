export type ButtonProps = {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
};
