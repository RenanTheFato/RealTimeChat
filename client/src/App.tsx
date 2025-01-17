import { ChatContainer } from "./components/chat/ChatContainer";
import { MessagesMenu } from "./components/MessagesMenu";

export default function App() {
  return (
    <main className="w-full h-screen flex flex-row p-8">
      <div className="w-full h-full flex flex-row shadow-2xl bg-gray-300">
        <MessagesMenu />
        <ChatContainer />
      </div>
    </main>
  )
}