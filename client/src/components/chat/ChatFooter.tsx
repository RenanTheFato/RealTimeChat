import { useState, useRef } from 'react'
import EmojiPicker, { EmojiStyle } from "emoji-picker-react"
import { SendHorizonal, Smile } from "lucide-react"

interface ChatFooterProps {
  onSendMessage: (message: string) => void
}

export function ChatFooter({ onSendMessage }: ChatFooterProps) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleSwitchEmojiPicker() {
    setIsEmojiPickerOpen((prev) => !prev)
  }

  function handleEmojiClick(emoji: any) {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newMessage = message.slice(0, start) + emoji.emoji + message.slice(end)
      setMessage(newMessage)

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.emoji.length
        textarea.focus()
      }, 0)
    }
  }

  function handleSendMessage() {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  function adjustTextareaHeight(e: React.FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 'px'
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <footer className="w-full min-h-14 flex flex-row items-end border-t-2 border-gray-400/30 bg-gray-300/50 px-4 py-2 space-x-4">
      <button
        className="bg-sky-400 p-2 rounded-full shrink-0 z-20 hover:bg-sky-500 transition-colors duration-200"
        onClick={handleSwitchEmojiPicker}
      >
        <Smile className="stroke-white w-5 h-5" />
      </button>

      <div className={`absolute z-10 transition-all duration-500 ${isEmojiPickerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <EmojiPicker
          className="bottom-20"
          emojiStyle={EmojiStyle.APPLE}
          open={isEmojiPickerOpen}
          onEmojiClick={handleEmojiClick}
        />
      </div>

      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full max-h-32 p-2 outline-none border-none font-outfit rounded-sm text-black/75 placeholder:text-black/60 resize-none overflow-y-scroll scroll-bar"
        placeholder="Type your message..."
        rows={1}
        onInput={adjustTextareaHeight}
      />

      <button
        className="w-20 flex items-center justify-center bg-sky-400 p-2 rounded-xl shrink-0 group hover:bg-sky-500 transition-colors duration-200"
        onClick={handleSendMessage}
      >
        <SendHorizonal className="stroke-white w-5 h-5" />
      </button>
    </footer>
  )
}