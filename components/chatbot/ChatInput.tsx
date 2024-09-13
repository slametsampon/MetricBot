// app/components/chatbot/ChatInput.tsx

interface ChatInputProps {
  input: string
  setInput: (input: string) => void
  handleSubmit: (e: React.FormEvent) => void
}

const ChatInput = ({ input, setInput, handleSubmit }: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tanyakan sesuatu..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Kirim
      </button>
    </form>
  )
}

export default ChatInput
