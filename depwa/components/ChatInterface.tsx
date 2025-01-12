import React, { useState } from 'react'
import { useDiagramStore } from '@/lib/store'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatInterface() {
  const [input, setInput] = useState('')
  const { chatHistory, generateDiagram, modifyDiagram, notationType } = useDiagramStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      if (chatHistory.length === 0) {
        await generateDiagram(input)
      } else {
        await modifyDiagram(input)
      }
      setInput('')
    } catch (error) {
      console.error('Error in chat submission:', error)
    }
  }

  return (
    <div className="flex flex-col h-[300px]">
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-md">
        {chatHistory.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-blue-600' : 'text-green-600'}`}>
            <strong>{message.role === 'user' ? 'You: ' : 'Assistant: '}</strong>
            {message.content}
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask for ${notationType} diagram assistance...`}
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

