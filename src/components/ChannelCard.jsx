import { Play, Pause } from "lucide-react";

export default function ChannelCard({ channel, isActive, isPlaying, onPlay }) {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out ${
        isActive ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <img
        className="w-full h-48 object-cover"
        src={channel.image}
        alt={channel.name}
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{channel.name}</h2>
        <p className="text-base text-gray-500 dark:text-gray-200 mb-4">
          {channel.tagline}
        </p>
        <button
          type="button"
          onClick={onPlay}
          aria-label={
            isActive && isPlaying
              ? `Pause ${channel.name}`
              : `Play ${channel.name}`
          }
          className={`px-4 py-2 rounded-md flex items-center justify-center cursor-pointer ${
            isActive
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {isActive && isPlaying ? (
            <>
              <Pause className="h-5 w-5 mr-2" />
              Now Playing
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-2" />
              Play
            </>
          )}
        </button>
      </div>
    </div>
  );
}
