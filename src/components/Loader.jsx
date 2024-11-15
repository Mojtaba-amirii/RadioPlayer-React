function Loader() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="text-gray-600">Loading channels...</p>
    </div>
  );
}

export default Loader;
