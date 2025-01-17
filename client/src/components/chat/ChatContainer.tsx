import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { ChatMain } from "./ChatMain";

export function ChatContainer(){
  return(
    <main className="w-full h-full flex flex-col bg-white select-none">
      <ChatHeader />
      <ChatMain />
      <ChatFooter />
    </main>
  )
}