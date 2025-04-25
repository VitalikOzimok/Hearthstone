export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm transition duration-700">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg text-gray-700 font-semibold">
          Загрузка данных...
        </p>
      </div>
    </div>
  );
}
