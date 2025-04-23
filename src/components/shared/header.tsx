type ChildProp = {
  text1?: string;
  text2?: string;
  className1?: string;
  className2?: string;
};
export function Header({ text1, text2, className1, className2 }: ChildProp) {
  return (
    <div
      className={`flex flex-col  items-center  gap-5 ${
        !className1 && !className2 && "pt-20"
      }`}
    >
      <h1
        className={
          className1 ? className1 : "text-7xl font-extrabold  text-violet-600"
        }
      >
        {text1}
      </h1>
      <h2
        className={
          className2 ? className2 : "text-4xl text-amber-500 font-extrabold"
        }
      >
        {text2}
      </h2>
    </div>
  );
}
