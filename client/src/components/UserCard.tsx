import { User2 } from "lucide-react"

export function UserCard() {
  return (
    <div className="mx-2">
      <div className="w-96 h-20 bg-white flex flex-row items-center border-b-2 shadow-lg transition-all duration-100 ease-in select-none hover:cursor-pointer hover:scale-105">
        <div className="flex items-center m-2">
          <div className="w-12 h-12 flex items-center justify-center bg-slate-600/75 rounded-full">
            <User2 className="w-8 h-8" />
          </div>
        </div>
        <div className="w-full flex flex-col justify-between py-2">
          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-lg font-outfit font-semibold text-neutral-800">Name</span>
            <span className="text-sm text-black/60 px-2">77-8090903</span>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-sm text-black/50">Last Message</span>
            <span className="text-xs text-black/50 px-2">12h ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}