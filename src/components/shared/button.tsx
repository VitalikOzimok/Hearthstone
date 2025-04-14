import { NavLink } from "react-router-dom";
type ButtonProps = {
  to?: string;
  text: string;
};
export function Button({ to, text }: ButtonProps) {
  return (
    <NavLink to={to || "#"}>
      <button className="p-3   px-5 max-md:w-full  hover:scale-105 cursor-pointer transition bg-indigo-500 text-white rounded-xl">
        {text}
      </button>
    </NavLink>
  );
}
