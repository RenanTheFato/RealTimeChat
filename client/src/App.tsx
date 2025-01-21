import { useState, useEffect } from "react"
import { ChatContainer } from "./components/chat/ChatContainer"
import { MessagesMenu } from "./components/MessagesMenu"
import { api } from "./services/api"
import ChatTemplate from "./components/chat/ChatTemplate"

interface User {
  id: string
  contact_id: string
  name: string
  last_seen_at: string
}

export default function App() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    async function loadCurrentUser() {
      const token = localStorage.getItem('authToken')
      try {
        const response = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setCurrentUser(response.data)
      } catch (error) {
        console.error('Error loading user:', error)
      }
    }

    loadCurrentUser()
  }, [])

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId)
  }

  return (
    <main className="w-full h-screen flex flex-row bg-gray-950/10 md:p-8">
      <div className="w-full h-full flex flex-row shadow-2xl z-10 border-r-2 border-gray-400/30">
        <MessagesMenu onSelectChat={handleSelectChat} />
        {selectedChatId && currentUser ? (
          <ChatContainer 
            user_id={currentUser.id}
            chat_id={selectedChatId}
          />
        ) : (
          <ChatTemplate />
        )}
      </div>
      <div className="absolute inset-0 w-full h-40 bg-sky-400 pointer-events-none" />
    </main>
  )
}