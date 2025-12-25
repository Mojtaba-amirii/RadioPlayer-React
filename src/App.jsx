import { Search } from "lucide-react";
import { useState, useCallback } from "react";

import Loader from "./components/Loader";
import ChannelCard from "./components/ChannelCard";
import AudioPlayer from "./components/AudioPlayer";
import { useRadioChannels } from "./hooks/useRadioChannels";

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
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-purple-500/30">
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-200 h-150 bg-teal-900/10 rounded-full blur-[100px] pointer-events-none" />

      <section className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex flex-col items-center mb-12 space-y-6">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              name="search"
              type="text"
              placeholder="Search for a station..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-md shadow-lg shadow-black/20"
              aria-label="Search channels"
            />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-red-400 font-medium">
              Failed to load channels: {error}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
