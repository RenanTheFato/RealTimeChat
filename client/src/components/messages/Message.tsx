interface MessageProps {
  isSent: boolean,
  message: string,
  showTail: boolean,
}

export function Message({ isSent, message, showTail = true }: MessageProps) {
  return (
    <div className={`w-full flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div className={`relative w-fit max-w-72 h-auto p-2 rounded-lg md:max-w-[484px]
        ${isSent ? 'bg-sky-400 hover:bg-sky-500' : 'bg-gray-200 hover:bg-gray-300'}
        ${showTail ? `before:content-[''] before:absolute before:top-0 before:border-t-[10px] before:border-r-[10px] before:border-l-[10px] 
          ${isSent
            ? 'before:-right-2 before:border-t-sky-400 before:border-l-sky-400 before:border-r-transparent before:hover:border-t-sky-500 before:hover:border-l-sky-500'
            : 'before:-left-2 before:border-t-gray-200 before:border-r-gray-200 before:border-l-transparent before:hover:border-t-gray-300 before:hover:border-r-gray-300'
          } before:border-b-transparent` : ''}`}>
        <p className={`font-outfit break-words ${isSent ? 'text-white' : 'text-gray-800'}`}>
          {message || 'Mensagem de exemplo'}
        </p>
      </div>
    </div>
  );
}