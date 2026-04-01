const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full border-4 border-black/20 border-t-black animate-spin" />
        <p className="text-gray-500 text-sm">Загрузка...</p>
      </div>
    </div>
  );
};

export default Loading;
