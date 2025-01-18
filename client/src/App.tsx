import { ChatContainer } from "./components/chat/ChatContainer"
import { MessagesMenu } from "./components/MessagesMenu"

export default function App() {
  return (
    <main className="w-full h-screen flex flex-row bg-gray-950/10 md:p-8">
      <div className="w-full h-full flex flex-row shadow-2xl z-10 border-r-2 border-gray-400/30">
        <MessagesMenu />
        <ChatContainer />
      </div>
      <div className="absolute inset-0 w-full h-40 bg-sky-400 pointer-events-none" />
    </main>
  )
}