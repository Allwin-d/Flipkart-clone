export type InputProps = {
  type: "text" | "radio" | "checkbox" | "email";  //Union Types
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  className: string;
  checked?: boolean;
};
