type ChildProp = {
  text1: string;
  text2: string;
};
export function Header({ text1, text2 }: ChildProp) {
  return (
    <div className="flex flex-col  items-center pt-20 gap-5">
      <h1 className="text-7xl font-extrabold  text-violet-600">{text1}</h1>
      <h2 className="text-4xl text-amber-500 font-extrabold ">{text2}</h2>
    </div>
  );
}
