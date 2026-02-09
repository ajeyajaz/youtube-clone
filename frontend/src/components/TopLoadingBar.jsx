const TopLoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen bg-black/60 z-999 overflow-hidden ">
      <div className="h-[3px] w-1/3 bg-yellow-300 animate-expand-bar" />
    </div>
  );
};

export default TopLoadingBar;
