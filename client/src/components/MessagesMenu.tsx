import { MessageSquarePlus } from "lucide-react";
import { UserCard } from "./UserCard";

export function MessagesMenu() {
  return (
    <div className="hidden w-[420px] h-full md:flex flex-col items-center bg-white border-r-2 border-gray-400/70 select-none">

      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-bar border-l-2 border-gray-400/30">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />

        <div className="w-full flex flex-row items-center justify-center p-4">
          <button className="w-full flex flex-row justify-center space-x-2 p-2 bg-sky-400 rounded-md shadow-md transition-all duration-500 hover:scale-105">
            <MessageSquarePlus className="w-6 h-6 stroke-white" />
            <span className="text-white text-base font-outfit font-semibold">Start New Chat</span>
          </button>
        </div>
      </div>

    </div>
  )
}