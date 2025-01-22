import { useEffect, useRef } from "react"
import { Message } from "../messages/Message"

interface MessageProps {
  id: string,
  content: string,
  send_by: string,
  send_at: string,
}

interface ChatMainProps {
  messages: MessageProps[],
  isLoading: boolean,
  currentUserId: string,
}

export function ChatMain({ messages, isLoading, currentUserId }: ChatMainProps) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>
  }

  return (
    <main className="flex-1 bg-off-white overflow-y-auto p-2 space-y-2 scroll-bar md:space-y-1">
      {messages.map((message, index) => {
        const isSent = String(message.send_by) === String(currentUserId);
        const showTail = index === 0 || messages[index - 1]?.send_by !== message.send_by

        const isLastMessage = index === messages.length - 1

        return (
          <div
            key={message.id}
            ref={isLastMessage ? lastMessageRef : null}
          >
            <Message
              isSent={isSent}
              message={message.content}
              showTail={showTail}
            />
          </div>
        );
      })}
    </main>
  );
}
