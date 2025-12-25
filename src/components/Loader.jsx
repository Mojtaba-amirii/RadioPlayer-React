import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 py-20">
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
        <Loader2 className="h-10 w-10 animate-spin text-purple-500 relative z-10" />
      </div>
      <p className="text-sm font-medium text-zinc-400 animate-pulse">
        Tuning in...
      </p>
    </div>
  );
}
