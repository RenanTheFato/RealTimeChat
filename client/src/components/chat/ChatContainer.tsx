import { useState, useEffect } from 'react'
import { Socket, io } from 'socket.io-client'
import { ChatFooter } from "./ChatFooter"
import { ChatHeader } from "./ChatHeader"
import { ChatMain } from "./ChatMain"
import { api } from "@/services/api"
import ChatTemplate from './ChatTemplate'

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
  const [error, setError] = useState<string | null>(null)
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  
  if (!chat_id) {
    return <ChatTemplate />
  }
  
  useEffect(() => {

    if (!baseUrl) {
      setError('API URL not configured')
      setIsLoading(false)
      return
    }

    const token = localStorage.getItem('authToken')
    if (!token) {
      setError('Authentication token not found')
      setIsLoading(false)
      return
    }

    const socket = io(baseUrl, {
      auth: {
        token
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    setSocket(socket)

    socket.on('connect', () => {
      console.log('Socket connected')
      socket.emit('user_connected', user_id)
    })

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
      setError('Failed to connect to chat server')
    })

    async function loadMessages() {
      try {
        const response = await api.get(`/chat/${chat_id}/messages`, {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        })
        setMessages(response.data)
        setError(null)
      } catch (error) {
        console.error('Error loading messages:', error)
        setError('Failed to load messages')
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
        setError('Failed to send message')
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [chat_id, user_id, baseUrl])

  function sendMessage(content: string) {
    if (!socket || !content.trim()) return

    const messageData = {
      content,
      send_by: user_id,
      chat_id: chat_id,
    }
    
    socket.emit('send_message', messageData)
  }

  if (error) {
    return <div className="w-full h-full flex items-center justify-center text-red-500">{error}</div>
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