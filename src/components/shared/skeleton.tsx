export function Skeleton() {
  const skeletonArray = Array.from({ length: 28 });
  return (
    <div className="flex mx-auto pt-5 w-full">
      <div className="mx-auto flex flex-wrap justify-center gap-14 w-full">
        {skeletonArray.map((_, index) => (
          <div
            key={index}
            className="w-40 h-56 bg-gray-300 rounded-xl animate-pulse shadow-md"
          />
        ))}
      </div>
    </div>
  );
}
