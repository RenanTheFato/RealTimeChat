import { Message } from "../messages/Message";

export function ChatMain() {
  return (
    <main className="flex-1 bg-off-white overflow-y-auto p-2 space-y-1 scroll-bar">

      <Message
        isSent={true}
        message="Primeira mensagem"
        showTail={true}
      />

      <Message
        isSent={false}
        message="Primeira mensagem"
        showTail={true}
      />

      <Message
        isSent={false}
        message="🐐"
        showTail={false}
      />

      <Message
        isSent={false}
        message="KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK mensagem"
        showTail={false}
      />

      <Message
        isSent={false}
        message="KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK mensagem"
        showTail={false}
      />

      <Message
        isSent={false}
        message="KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK mensagem"
        showTail={false}
      />

      <Message
        isSent={false}
        message="KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK mensagem"
        showTail={false}
      />

      <Message
        isSent={true}
        message="SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
        showTail={true}
      />

      <Message
        isSent={true}
        message="SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
        showTail={false}
      />

      <Message
        isSent={true}
        message="SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
        showTail={false}
      />

    </main>
  )
}