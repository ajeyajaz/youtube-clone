function CircleImage({ src, w, h }) {
  return (
    <div className={`w-${w} h-${h} rounded-full overflow-hidden`}>
      <img src={src} className='w-full h-full'/>
    </div>
  );
}

export default CircleImage;
