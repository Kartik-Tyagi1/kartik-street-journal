// This is a special component that next.js will use when its waiting for something to load

function Loading() {
  return (
    <div className="animate-pulse font-serif text-lg text-gray-500 text-center p-10">
      Gathering News For You
    </div>
  );
}

export default Loading;
