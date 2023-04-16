import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

interface ButtonProps {
  disabled: boolean;
  type: "button" | "reset" | "submit" | undefined;
  label: string;
  clickHandler?: Function;
}
const Button = ({ disabled, type, label }: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ${
        disabled ? "bg-red-500" : "bg-purple-500 hover:bg-purple-800"
      } `}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
