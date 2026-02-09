function NoVideos() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center space-y-3">
        <h2 className="text-xl font-semibold text-white tracking-wide">
          No videos uploaded yet
        </h2>
        
        {/* subtle divider */}
        <div className="w-16 h-[2px] bg-neutral-700 mx-auto mt-4 rounded-full" />
      </div>
    </div>
  );
}

export default NoVideos;
