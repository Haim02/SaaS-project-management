import type { ReactNode } from "react";
import Spinner from "../Spinner";

type ButtonProps = {
  type: "submit" | "reset" | "button";
  text: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
};


const Button = ({type, text, className, children, onClick, isLoading= false}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-3 rounded mb-4`}
    >
      {isLoading ? <Spinner /> : text} {children}
    </button>
  );
}

export default Button
