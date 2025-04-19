import { JSX } from "react";
import { NavLink } from "react-router-dom";
type ButtonProps = {
  to?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  color?: string;
};
export function Button({ to, text, onClick, icon, color }: ButtonProps) {
  return (
    <NavLink to={to || "#"}>
      <button
        onClick={onClick}
        className={` px-4 py-2 font-semibold shadow-md flex justify-center items-center   max-md:w-full  hover:scale-105 active:scale-95 cursor-pointer transition  duration-300 ease-in-out bg-blue-600  ${color} text-white rounded-xl `}
      >
        {text}
        <div className="text-red-400 mt-[2px]">{icon}</div>
      </button>
    </NavLink>
  );
}
