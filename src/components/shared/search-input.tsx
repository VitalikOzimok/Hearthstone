import { Search } from "lucide-react";
import React from "react";

export default function SeacrhInput() {
  const ref = React.useRef(null);
  return (
    <>
      <div
        ref={ref}
        className="flex rounded-2xl flex-1 justify-between relative h-11 z-30"
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-full outline-none w-full  bg-gray-100 pl-11"
          type="text"
          placeholder="Найти ..."
        />
      </div>
    </>
  );
}
