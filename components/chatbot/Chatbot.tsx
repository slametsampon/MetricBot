'use client'

import { useState, useEffect } from 'react'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

interface Conversation {
  user: string
  bot: string
}

const Chatbot = () => {
  const [messages, setMessages] = useState<{ user?: string; bot?: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationData, setConversationData] = useState<Conversation[]>([])

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch('/api/chatbot') // Endpoint API yang membaca data static
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      setConversationData(data)
    }

    fetchConversations().catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const userMessage = input.trim()
    setMessages([...messages, { user: userMessage }])
    setLoading(true)

    // Simulasi waktu tunggu (misal 100 detik)
    // await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = conversationData.find((conv) =>
      conv.user.toLowerCase().includes(userMessage.toLowerCase())
    )

    const botMessage = response
      ? response.bot
      : 'Maaf, saya tidak memiliki jawaban untuk pertanyaan tersebut.'

    setMessages((prevMessages) => [...prevMessages, { bot: botMessage }])
    setLoading(false)
    setInput('')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">MetricBot</h1>
      <ChatMessages messages={messages} loading={loading} />
      <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Chatbot
