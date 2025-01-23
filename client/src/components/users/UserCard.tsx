import { User2 } from "lucide-react"
import { useState, useEffect } from 'react'

interface ChatInfo {
  id: string
  contact_id: string
  name: string
  last_seen_at: string
  last_message: {
    content: string
    send_at: string
    send_by: string
  } | null
}

interface UserCardProps {
  chatInfo: ChatInfo
  onClick?: (chatId: string) => void
}

export function UserCard({ chatInfo, onClick }: UserCardProps) {
  const [timeString, setTimeString] = useState('')

  function formatMessageTime(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    const diffHours = Math.floor(diffMinutes / 60)

    if (diffHours < 1) {
      if (diffMinutes === 0) {
        return 'just now'
      }
      return `${diffMinutes}m ago`
    }
    if (diffHours < 24) {
      return `${diffHours}h ago`
    }
    return date.toLocaleDateString()
  }

  useEffect(() => {
    function updateTime() {
      const timeToShow = chatInfo.last_message
        ? formatMessageTime(chatInfo.last_message.send_at)
        : formatMessageTime(chatInfo.last_seen_at)
      setTimeString(timeToShow)
    }

    updateTime()

    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [chatInfo])

  return (
    <div className="mx-2" onClick={() => onClick?.(chatInfo.id)}>
      <div className="w-96 h-20 bg-white flex flex-row items-center border-b-2 shadow-lg transition-all duration-100 ease-in select-none hover:cursor-pointer hover:scale-105">
        <div className="flex items-center m-2">
          <div className="w-12 h-12 flex items-center justify-center bg-slate-600/75 rounded-full">
            <User2 className="w-8 h-8" />
          </div>
        </div>
        <div className="w-full flex flex-col justify-between py-2">
          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-lg font-outfit font-semibold text-neutral-800">
              {chatInfo.name}
            </span>
            <span className="text-sm text-black/60 px-2">
              {chatInfo.contact_id}
            </span>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-sm text-black/50">
              {chatInfo.last_message?.content || 'No messages yet'}
            </span>
            <span className="text-xs text-black/50 px-2">
              {timeString}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}