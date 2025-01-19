import { MessageSquare } from 'lucide-react'

export default function ChatTemplate() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4 max-w-md text-center p-8">
        <div className="p-4 bg-white rounded-full shadow-md">
          <MessageSquare size={48} className="text-blue-500" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome to your chat
        </h1>

        <p className="text-gray-600">
          Select a conversation to start sending messages or start a new conversation.
        </p>
      </div>
    </div>
  )
}