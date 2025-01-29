import { useState, useCallback } from "react";
import { useRadioChannels } from "./hooks/useRadioChannels";
import ChannelCard from "./components/ChannelCard";
import AudioPlayer from "./components/AudioPlayer";
import Loader from "./components/Loader";
import { Search } from "lucide-react";

export default function App() {
  const { channels, loading, error } = useRadioChannels();
  const [activeChannelIndex, setActiveChannelIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChannelChange = useCallback((index) => {
    setActiveChannelIndex(index);
    setIsPlaying(true);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto min-h-screen">
      <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mb-24">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex mb-4">
            <input
              name="search"
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="grow mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <button
              title="search"
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500 font-semibold">
              Failed to load channels: {error}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
              {filteredChannels.map((channel, index) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  isActive={index === activeChannelIndex}
                  isPlaying={isPlaying && index === activeChannelIndex}
                  onPlay={() => handleChannelChange(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      {channels.length > 0 && activeChannelIndex !== null && (
        <AudioPlayer
          channels={channels}
          activeChannelIndex={activeChannelIndex}
          isPlaying={isPlaying}
          onChannelChange={handleChannelChange}
          onTogglePlay={handleTogglePlay}
        />
      )}
    </main>
  );
}
