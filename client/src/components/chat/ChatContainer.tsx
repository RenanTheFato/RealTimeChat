import { useState, useEffect } from 'react'
import { Socket, io } from 'socket.io-client'
import { ChatFooter } from './ChatFooter'
import { ChatHeader } from './ChatHeader'
import { ChatMain } from './ChatMain'
import { api } from '@/services/api'
import ChatTemplate from './ChatTemplate'

interface Message {
  id: string,
  content: string,
  send_by: string,
  send_at: string,

}
interface User {
  id: string;
  name: string;
  last_online: string;
}

interface ChatContainerProps {
  user_id: string,
  chat_id: string,
}

export function ChatContainer({ user_id, chat_id }: ChatContainerProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [userDestination, setUserDestination] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const wsURL = import.meta.env.VITE_WS_BASE_URL

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
    console.log('Using auth token:', token?.substring(0, 10) + '...')
    if (!token) {
      setError('Authentication token not found')
      setIsLoading(false)
      return
    }

    console.log('Connecting to socket server:', wsURL)

    async function loadOtherUser() {
      try {
        const response = await api.get(`/chat/${chat_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDestination(response.data);
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load user data');
      }
    }

    loadOtherUser();


    const socket = io(wsURL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    })

    setSocket(socket)

    socket.on('connect', () => {
      console.log('Socket connected successfully')
      console.log('Socket connected successfully with ID:', socket.id)
      socket.emit('user_connected', user_id)
      socket.emit('join_chat', chat_id)
    })

    socket.on('auth_error', (err) => {
      console.error('Authentication error:', err.message)
      setError('Authentication failed. Please login again.')
      socket.disconnect()
    })

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
      setError('Failed to connect to chat server')
      console.error(error.message)
    })

    socket.io.on("reconnect_attempt", (attempt) => {
      console.log("Attempting to reconnect:", attempt)
    })

    socket.on('disconnect', (reason) => {
      console.warn('Socket disconnected:', reason)
      if (reason === 'io server disconnect') {
        setError('Disconnected from chat server. Please try reconnecting.')
      }
    })

    async function loadMessages() {
      try {
        const response = await api.get(`/chat/${chat_id}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        })
    
        const validatedMessages = response.data.map((msg: Message) => ({
          ...msg,
          send_by: String(msg.send_by), 
        }))
    
        setMessages(validatedMessages)
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
      console.log('Received message:', message)
    
      setMessages((prev) => {
        const messageExists = prev.some(m => m.id === message.id)
        const isTempMessage = prev.some(m => m.id.startsWith('temp-') && m.content === message.content)
    
        if (messageExists) return prev
    
        if (isTempMessage) {
          return prev.map(m => 
            m.id.startsWith('temp-') && m.content === message.content ? message : m
          )
        }
    
        return [...prev, message]
      })
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
  }, [wsURL, chat_id, user_id])

  function sendMessage(content: string) {
    if (!socket || !content.trim()) return
  
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      content,
      send_by: user_id,
      send_at: new Date().toISOString()
    }
  
    setMessages(prev => [...prev, tempMessage])
  
    socket.emit('send_message', { content, send_by: user_id, chat_id }, (response: { status: string, message: Message }) => {
      if (response.status === 'success') {
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id ? response.message : msg
        ))
      } else {
        console.error('Failed to send message:', response)
      }
    })
  }

  if (error) {
    return <div className="w-full h-full flex items-center justify-center text-red-500">{error}</div>
  }

  return (
    <main className="w-full h-full flex flex-col bg-white select-none">
      <ChatHeader userDestination={userDestination}/>
      <ChatMain messages={messages} isLoading={isLoading} currentUserId={user_id} />
      <ChatFooter onSendMessage={sendMessage} />
    </main>
  )
}
