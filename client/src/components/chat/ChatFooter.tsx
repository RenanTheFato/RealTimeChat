import EmojiPicker, { EmojiStyle } from "emoji-picker-react"
import { SendHorizonal, Smile } from "lucide-react"
import { useState } from "react"

export function ChatFooter() {

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)

  function handleSwitchEmojiPicker() {
    setIsEmojiPickerOpen((prev) => !prev)
  }

  function handleEmojiClick(emoji: any) {
    console.log("Emoji code:", emoji.emoji)
  }

  return (
    <footer className="w-full min-h-14 flex flex-row items-end border-t-2 border-gray-400/30 bg-gray-300/50 px-4 py-2 space-x-4">
      <button className="bg-sky-400 p-2 rounded-full shrink-0 z-20" onClick={handleSwitchEmojiPicker}>
        <Smile className="stroke-white w-5 h-5" />
      </button>

      <div className="absolute z-10">
        <EmojiPicker className="bottom-20" emojiStyle={EmojiStyle.APPLE} open={isEmojiPickerOpen}  onEmojiClick={handleEmojiClick}/>
      </div>

      <textarea
        className="w-full max-h-32 p-2 outline-none border-none font-outfit rounded-sm text-black/75 placeholder:text-black/60 resize-none overflow-y-scroll scroll-bar"
        placeholder="Type your message..."
        rows={1}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement
          target.style.height = 'auto';
          target.style.height = target.scrollHeight + 'px';
        }}
      />

      <button className="w-20 flex items-center justify-center bg-sky-400 p-2 rounded-xl shrink-0 group">
        <SendHorizonal className="stroke-white w-5 h-5" />
      </button>
    </footer>
  )
}