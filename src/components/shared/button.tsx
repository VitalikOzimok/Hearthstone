import { JSX } from "react";
import { NavLink } from "react-router-dom";
type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  to?: string;
};
export function Button({ to, text, onClick, icon }: ButtonProps) {
  return (
    <NavLink to={to || "#"}>
      <button
        onClick={onClick}
        className=" p-3 flex justify-center items-center  px-5 max-md:w-full  hover:scale-105 cursor-pointer transition bg-indigo-500 text-white rounded-xl"
      >
        {text}
        <div className="text-red-400 mt-[2px]">{icon}</div>
      </button>
    </NavLink>
  );
}
