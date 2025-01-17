import { SendHorizonal, Smile } from "lucide-react";

export function ChatFooter(){
  return(
    <footer className="w-full min-h-14 flex flex-row items-end bg-gray-300/50 px-4 py-2 space-x-4">
      <button className="bg-sky-400 p-2 rounded-full shrink-0">
        <Smile className="stroke-white w-5 h-5"/>
      </button>

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

      <button className="w-20 flex items-center justify-center bg-sky-400 p-2 rounded-xl shrink-0">
        <SendHorizonal className="stroke-white w-5 h-5"/>
      </button>
    </footer>
  )
}