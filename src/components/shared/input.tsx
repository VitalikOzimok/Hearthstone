import { ChangeEvent } from "react";

type ChildProp = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export function Input({ type, placeholder, value, onChange }: ChildProp) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border-[1px] border-indigo-500 rounded-md min-w-xl p-2"
    />
  );
}
