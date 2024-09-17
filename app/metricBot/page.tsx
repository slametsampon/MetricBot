import Chatbot from '@/components/chatbot/Chatbot'
import SearchBar from '@/components/chatbot/SearchBar'
import SearchBlog from '@/components/chatbot/SearchBlog'

export default function ChatbotPage() {
  return (
    <div>
      {/* <Chatbot /> */}
      <h1 className="text-2xl font-bold mb-4">Pencarian Blog di MetricBot</h1>
      <SearchBar /> {/* Menampilkan komponen pencarian */}
    </div>
  )
}
