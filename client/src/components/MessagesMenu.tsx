import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useState, useEffect } from 'react'
import { MessageSquarePlus, MessageSquareShare } from "lucide-react"
import { UserCard } from "./UserCard"
import { api } from "@/services/api"

interface Chat {
  id: string
  contact_id: string
  name: string
  last_seen_at: string
  last_message: {
    content: string
    send_at: string
    send_by: string
  } | null
  created_at: string
}

interface User {
  id: string
  contact_id: string
  name: string
  last_seen_at: string
}

export function MessagesMenu({ onSelectChat }: {onSelectChat: (chatId: string) => void}) {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [contactId, setContactId] = useState('')

  useEffect(() => {
    async function loadUserAndChats() {
      const token = localStorage.getItem('authToken')

      try {
        const userResponse = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setCurrentUser(userResponse.data)

        const chatsResponse = await api.get('/chats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setChats(chatsResponse.data)
      } catch (error) {
        console.error('Error loading data:', error)

        setChats([])
      } finally {
        setIsLoading(false)
      }
    }

    loadUserAndChats()
  }, [])

  async function handleStartNewChat() {
    const token = localStorage.getItem('authToken')

    try {
      const response = await api.post('/chats', 
        { 
          contact_id: contactId 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const newChat = response.data
      setChats(prevChats => [...prevChats, newChat])
      onSelectChat(newChat.id)
    } catch (error) {
      console.error('Error creating chat:', error)
    }
  }

  if (isLoading || !currentUser) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className='font-outfit'>Loading...</span>
      </div>
    )
  }

  function ChatButton() {
    return (
      <div className="w-full flex flex-row items-center justify-center p-4">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-60 flex flex-row justify-center space-x-2 p-2 bg-sky-400 rounded-md shadow-md transition-all duration-500 hover:scale-105">
              <MessageSquarePlus className="w-6 h-6 stroke-white" />
              <span className="text-white text-base font-outfit font-semibold">Start New Chat</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='font-outfit'>Start a new conversation</DialogTitle>
              <DialogDescription className='font-outfit'>Insert a valid number to start an chat</DialogDescription>
            </DialogHeader>
            <div className='w-full flex flex-col items-center p-2 space-y-4'>
              <input value={contactId} onChange={(e) => setContactId(e.target.value)} className='w-full p-2 rounded-sm border-none outline-none ring-2 ring-black font-outfit text-black/75 transition-all duration-200 placeholder:text-black/60 focus:ring-sky-500' placeholder='Insert the contact number...' />
              <button onClick={handleStartNewChat} className="w-full flex flex-row justify-center space-x-2 p-2 bg-sky-400 rounded-md shadow-md transition-all duration-500 hover:scale-105">
                <MessageSquareShare className="w-6 h-6 stroke-white" />
                <span className="text-white text-base font-outfit font-semibold">Open Chat</span>
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="hidden w-[420px] h-full xl:flex flex-col items-center bg-white border-r-2 border-gray-400/70 select-none">
      <div className={`flex-1 overflow-y-auto overflow-x-hidden scroll-bar border-gray-400/30 ${chats.length === 0 ? "border-l-0" : "border-l-2"}`}>
        {chats.length > 0 ? (
          <>
            {chats.map(chat => (
              <UserCard
                key={chat.id}
                chatInfo={chat}
                onClick={() => onSelectChat(chat.id)}
              />
            ))}
            <ChatButton />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-gray-500 mb-4">No chats yet</p>
            <ChatButton />
          </div>
        )}
      </div>
    </div>
  )
}