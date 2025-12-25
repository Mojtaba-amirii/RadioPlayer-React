import { Play, Pause } from "lucide-react";

export default function ChannelCard({ channel, isActive, isPlaying, onPlay }) {
  return (
    <button
      onClick={onPlay}
      className={`group relative w-full text-left p-4 rounded-3xl transition-all duration-500 ease-out cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
        isActive
          ? "bg-white/10 border-purple-500/50 shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-xl"
      }`}
      aria-label={`${isActive && isPlaying ? "Pause" : "Play"} ${channel.name}`}
      aria-pressed={isActive && isPlaying}
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-zinc-900 shadow-lg">
        <img
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isActive ? "scale-110" : "group-hover:scale-110"
          }`}
          src={channel.image}
          alt={channel.name}
          loading="lazy"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
              isActive
                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/40 scale-100"
                : "bg-white/20 text-white hover:bg-white/30 hover:scale-110"
            }`}
          >
            {isActive && isPlaying ? (
              <Pause className="h-6 w-6 fill-current" />
            ) : (
              <Play className="h-6 w-6 fill-current ml-1" />
            )}
          </div>
        </div>

        {/* Live Indicator */}
        {isActive && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            LIVE
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h2
          className={`text-lg font-bold truncate transition-colors ${
            isActive
              ? "text-purple-400"
              : "text-white group-hover:text-purple-300"
          }`}
        >
          {channel.name}
        </h2>
        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
          {channel.tagline || "Best radio station"}
        </p>
      </div>
    </button>
  );
}
