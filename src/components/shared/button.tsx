import { NavLink } from "react-router-dom";
type ButtonProps = {
  to: string;
  text: string;
};
export function Button({ to, text }: ButtonProps) {
  return (
    <NavLink to={to}>
      <div className="pt-8">
        <button className="p-3 px-14 cursor-pointer hover:scale-105  transition  bg-indigo-500 text-white rounded-xl ">
          {text}
        </button>
      </div>
    </NavLink>
  );
}
