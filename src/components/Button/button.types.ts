export type ButtonProps = {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  disable?: boolean;
};
