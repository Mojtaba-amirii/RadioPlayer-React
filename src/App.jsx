import { useState } from "react";
import { useRadioChannels } from "./hooks/useRadioChannels";
import ChannelCard from "./components/ChannelCard";
import Loader from "./components/Loader";

function App() {
  const { channels, loading, error } = useRadioChannels();
  const [activeChannel, setActiveChannel] = useState(null);

  const handlePlay = (index) => {
    setActiveChannel(index);
  };

  return (
    <section className="container h-full flex flex-col items-center justify-center mx-auto gap-6 p-4">
      <h1 className="text-2xl font-bold text-gray-600">Radio Sweden</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 font-semibold">
          Failed to load channels: {error}
        </p>
      ) : (
        channels.map((channel, index) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            isActive={activeChannel === index}
            onPlay={() => handlePlay(index)}
          />
        ))
      )}
    </section>
  );
}

export default App;
