import { Radio } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-xl">
            <Radio className="h-6 w-6 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Radio<span className="text-purple-500">Player</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer">
            Live
          </button>
          <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer">
            Podcasts
          </button>
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-500 to-teal-500 ml-2" />
        </div>
      </div>
    </header>
  );
};

export default Header;
