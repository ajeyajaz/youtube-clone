function CircleImage({src, w, h}) {
  return (
    <img
          src={src}
          className={`w-${w} h-${h} rounded-full object-cover`}
        />
  )
}

export default CircleImage