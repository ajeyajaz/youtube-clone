import { useParams } from "react-router-dom";
import ChannelHeader from "./ChannelHeader";
import ChannelBody from "./ChannelBody";
import useChannel from "./useChannel";
import TopLoadingBar from "../components/TopLoadingBar";

function ChannelPage() {
  const { handle } = useParams();
  const { data: channel, isLoading, error } = useChannel(handle);

  if (error) return <p>channel not found</p>;

  return (
    <>
      {channel && (
        <section>
          <ChannelHeader channel={channel} />
          <ChannelBody channel={channel} />
        </section>
      )}
     {isLoading &&  <TopLoadingBar />}
    </>
  );
}

export default ChannelPage;
