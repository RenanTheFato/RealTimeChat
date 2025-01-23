import { User2 } from "lucide-react"

interface User {
  name: string;
  last_online: string;
}

interface ChatHeaderProps {
  userDestination: User | null
}

export function ChatHeader({ userDestination }: ChatHeaderProps) {

  if (!userDestination) {
    return
  }
  
  return (
    <header className="w-full h-16 flex flex-row border-b-2 border-gray-400/30 bg-gray-300/50 px-2 space-x-1">

      <div className="flex items-center m-2">
        <div className="w-12 h-12 flex items-center justify-center bg-slate-600/75 rounded-full">
          <User2 className="w-8 h-8" />
        </div>
      </div>

      <div className="flex flex-col justify-between py-2">
        <span className="text-lg font-outfit font-semibold text-neutral-800">{userDestination.name}</span>
        <span className="font-outfit text-sm text-black/50">{`Last Time Online: ${userDestination.last_online}`}</span>
      </div>

    </header>
  )
}