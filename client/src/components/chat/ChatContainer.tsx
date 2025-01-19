import { useState, useEffect } from 'react'
import { Socket, io } from 'socket.io-client'
import { ChatFooter } from "./ChatFooter"
import { ChatHeader } from "./ChatHeader"
import { ChatMain } from "./ChatMain"
import { api } from "@/services/api"

interface Message {
  id: string
  content: string
  send_by: string
  send_at: string
}

interface ChatContainerProps {
  user_id: string
  chat_id: string
}

export function ChatContainer({ user_id, chat_id }: ChatContainerProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const socket = io(baseUrl)
    setSocket(socket)

    socket.emit('user_connected', user_id)

    async function loadMessages() {
      const token = localStorage.getItem('authToken')
      try {
        const response = await api.get(`/chat/${chat_id}/messages`, {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        })
        setMessages(response.data)
      } catch (error) {
        console.error(`Error loading messages: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()

    socket.on('receive_message', (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    socket.on('message_status', (status: { status: string, messageId?: string, error?: string }) => {
      if (status.status === 'error') {
        console.error('Error sending message:', status.error)
      }
    })

    return () => {
      socket.close()
    }
  }, [chat_id, user_id, baseUrl])

  function sendMessage(content: string){
    if (socket && content.trim()) {
      const messageData = {
        content,
        send_by: user_id,
        chat_id: chat_id,
      }
      socket.emit('send_message', messageData)
    }
  }

  return (
    <main className="w-full h-full flex flex-col bg-white select-none">
      <ChatHeader />
      <ChatMain 
        messages={messages} 
        isLoading={isLoading} 
        currentUserId={user_id} 
      />
      <ChatFooter onSendMessage={sendMessage} />
    </main>
  )
}