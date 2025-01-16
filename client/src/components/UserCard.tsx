import { User2 } from "lucide-react"

export function UserCard() {
  return (
    <div className="w-96 h-20 bg-white flex flex-row items-center border-b-2 shadow-lg transition-all duration-100 ease-in first:rounded-tl-md first:rounded-tr-md last:border-b-0 last:rounded-bl-md last:rounded-br-md hover:cursor-pointer hover:scale-105">
      
      <div className="flex items-center justify-center m-2">
        <div className="flex items-center bg-slate-600/75 p-2 rounded-full">
          <User2 className="w-8 h-8" />
        </div>
      </div>

      <div className="w-full flex flex-col space-y-1">
        <div className="flex flex-row items-center">
          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-lg font-outfit font-semibold text-neutral-800">Name</span>
            <span className="text-sm text-black/60 px-2">77-8090903</span>
          </div>
        </div>

        <div className="flex flex-row items-end h-full">
          <span className="text-sm text-black/50">Last Message</span>
          <span className="text-xs ml-auto px-2">12h ago</span>
        </div>
      </div>
    </div>
  )
}