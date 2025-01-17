import { User2 } from "lucide-react";

export function ChatHeader() {
  return (
    <header className="w-full h-16 flex flex-row bg-gray-300/50 px-2 space-x-1">

      <div className="flex items-center m-2">
        <div className="w-12 h-12 flex items-center justify-center bg-slate-600/75 rounded-full">
          <User2 className="w-8 h-8" />
        </div>
      </div>

      <div className="flex flex-col justify-between py-2">
        <span className="text-lg font-outfit font-semibold text-neutral-800">Name</span>
        <span className="font-outfit text-sm text-black/50">Last Time Online: 12h ago</span>
      </div>

    </header>
  )
}