import Chatbot from '@/components/chatbot/Chatbot'
import SearchBlog from '@/components/chatbot/SearchBlog'

export default function ChatbotPage() {
  return (
    <div>
      {/* <Chatbot /> */}
      <h1 className="text-2xl font-bold mb-4">Pencarian Blog di MetricBot</h1>
      <SearchBlog /> {/* Menampilkan komponen pencarian */}
    </div>
  )
}
