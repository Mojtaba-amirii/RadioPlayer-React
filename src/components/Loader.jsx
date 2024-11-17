import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className=" w-full flex flex-col items-center justify-center space-y-2">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading channels...
      </p>
    </div>
  );
}
