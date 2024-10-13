const LoadingResponse = () => {
  return (
    <div className="flex gap-x-1 justify-start items-center h-7">
      <span className="sr-only">Loading...</span>
      <div className="size-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="size-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="size-2 bg-indigo-600 rounded-full animate-bounce" />
    </div>
  );
};

export default LoadingResponse;
