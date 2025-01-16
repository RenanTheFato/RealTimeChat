import { MessagesMenu } from "./components/MessagesMenu";

export default function App() {
  return (
    <main className="w-full h-screen flex flex-row p-4">
      <div className="w-full h-full flex flex-col rounded-md shadow-xl bg-blue-600">
        <MessagesMenu />
      </div>
    </main>
  )
}