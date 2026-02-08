import { useParams } from "react-router-dom";
import ChannelHeader from "./ChannelHeader";
import ChannelBody from "./ChannelBody";
import useChannel from "./useChannel";

function ChannelPage() {
  const { handle } = useParams();
  const { data: channel, isLoading, error } = useChannel(handle);
  console.log("handle:", handle);

  if (isLoading) return <p>isLoading</p>;
  if (error) return <p>channel not found</p>;

  console.log("channel", channel);

  return (
    <>
      {channel && (
        <section>
          <ChannelHeader channel={channel} />
          <ChannelBody channel={channel} />
        </section>
      )}
    </>
  );
}

export default ChannelPage;
