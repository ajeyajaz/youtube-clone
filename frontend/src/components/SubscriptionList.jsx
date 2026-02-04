import CircleImage from "../components/CircleImage";


function SubscriptionList() {
  const channels = new Array(4).fill(0);

  return (
    <ul className="flex flex-col gap-3 text-sm">
      {channels.map((c, i) => (
        <li className="flex gap-x-5 items-center">
          <CircleImage 
            src={`https://i.pravatar.cc/150?$img=${i}`} 
            w={7} h={7} 
          />
          <span className="line-clamp-1">Demo channel 1</span>
        </li>
      ))}
    </ul>
  );
}

export default SubscriptionList;
