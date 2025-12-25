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
        audioRef.current.play().catch((error) => {
          // Ignore AbortError which happens when pausing while loading
          if (error.name !== "AbortError") {
            console.error("Playback failed:", error);
          }
        });
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
    <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-175 z-50">
      <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full p-3 shadow-2xl shadow-black/50 flex items-center justify-between gap-4">
        {/* Channel Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="relative group">
            <img
              src={currentChannel.image}
              alt={currentChannel.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/10 animate-[spin_10s_linear_infinite]"
              style={{ animationPlayState: isPlaying ? "running" : "paused" }}
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-full border border-white/20" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-white truncate text-sm">
              {currentChannel.name}
            </h3>
            <p className="text-xs text-purple-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Live Radio
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            className="p-3 text-zinc-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full"
            onClick={handleNext}
            aria-label="Next channel"
          >
            <SkipForward className="h-6 w-6" />
          </button>

          <button
            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 fill-current" />
            ) : (
              <Play className="h-6 w-6 fill-current ml-1" />
            )}
          </button>
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 pr-4 border-l border-white/10 pl-4">
          <button
            onClick={toggleMute}
            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-full"
            aria-label={isMuted ? "Unmute" : "Mute"}
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
            className="w-24 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
            aria-label="Volume"
          />
        </div>
      </div>
      <audio ref={audioRef} src={currentChannel.liveaudio.url} preload="auto" />
    </div>
  );
}
