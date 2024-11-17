import { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX, SkipForward, Pause, Play } from "lucide-react";

export default function AudioPlayer({
  channels,
  activeChannelIndex,
  isPlaying,
  onChannelChange,
  onTogglePlay,
}) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const currentChannel = channels[activeChannelIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeChannelIndex]);

  const handleNext = () => {
    const nextIndex = (activeChannelIndex + 1) % channels.length;
    onChannelChange(nextIndex);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 shadow-lg bg-sky-900">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={currentChannel.image}
            alt={currentChannel.name}
            className="w-12 h-12 rounded"
          />
          <div>
            <h3 className="font-semibold">{currentChannel.name}</h3>
            <p className="text-sm text-green-500">Now Playing</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={onTogglePlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          <button
            className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={handleNext}
          >
            <SkipForward className="h-5 w-5" />
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
      <audio ref={audioRef} src={currentChannel.liveaudio.url} preload="auto" />
    </div>
  );
}
