import { Message } from "../messages/Message"

interface MessageProps {
  id: string
  content: string
  send_by: string
  send_at: string
}

interface ChatMainProps {
  messages: MessageProps[]
  isLoading: boolean
  currentUserId: string
}

export function ChatMain({ messages, isLoading, currentUserId }: ChatMainProps) {
  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>
  }

  return (
    <main className="flex-1 bg-off-white overflow-y-auto p-2 space-y-2 scroll-bar md:space-y-1">
      {messages.map((message, index) => {
        const isSent = message.send_by === currentUserId
        const showTail = index === 0 || messages[index - 1]?.send_by !== message.send_by

        return (
          <Message
            key={message.id}
            isSent={isSent}
            message={message.content}
            showTail={showTail}
          />
        )
      })}
    </main>
  )
}