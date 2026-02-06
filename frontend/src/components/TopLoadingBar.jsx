const TopLoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-50 overflow-hidden">
      <div className="h-full w-1/3 bg-yellow-300 animate-expand-bar" />
    </div>
  );
};

export default TopLoadingBar;
