import { useRef, useEffect } from "react";

function ChannelCard({ channel, isActive, onPlay }) {
  const audioRef = useRef();

  useEffect(() => {
    if (isActive) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isActive]);

  const handlePlay = () => {
    audioRef.current.play();
    onPlay();
  };

  return (
    <div
      className={`max-w-xl flex flex-row rounded-lg overflow-hidden ${isActive ? "shadow-lg scale-105 transition-all duration-300 ease-in-out" : ""}`}
    >
      <div className="w-1/4">
        <img
          className="w-full h-full aspect-ratio-16/9 object-fill"
          src={channel.image}
          alt={channel.name}
        />
      </div>
      <div
        className="w-3/4 flex flex-col text-3xl text-gray-700 gap-y-4 py-2 px-4"
        style={{ backgroundColor: `#${channel.color}` }}
      >
        <h2 className="text-xl font-semibold">{channel.name}</h2>
        <audio ref={audioRef} controls onPlay={handlePlay}>
          <source src={channel.liveaudio.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

export default ChannelCard;
