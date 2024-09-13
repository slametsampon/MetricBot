// app/components/chatbot/ChatMessages.tsx

import Spinner from './Spinner'

interface Message {
  user?: string
  bot?: string
}

interface ChatMessagesProps {
  messages: Message[]
  loading: boolean // Tambahkan loading sebagai prop
}

const ChatMessages = ({ messages, loading }: ChatMessagesProps) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4 h-80 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className={`mb-3 flex ${msg.user ? 'justify-end' : 'justify-start'}`}>
          {msg.user && (
            <div className="bg-blue-500 text-white py-2 px-4 rounded-lg max-w-xs md:max-w-md">
              {msg.user}
            </div>
          )}
          {msg.bot && (
            <div className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg max-w-xs md:max-w-md">
              {msg.bot}
            </div>
          )}
        </div>
      ))}
      {loading && ( // Tambahkan spinner di dalam chat bubble
        <div className="flex justify-start">
          <div className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg max-w-xs md:max-w-md">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatMessages
