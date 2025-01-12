import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateDiagram, modifyDiagram } from './gemini'

export type NotationType = 'mermaid' | 'plantuml'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface DiagramState {
  code: string
  notationType: NotationType
  isDarkMode: boolean
  chatHistory: ChatMessage[]
  setCode: (code: string) => void
  setNotationType: (type: NotationType) => void
  toggleDarkMode: () => void
  addChatMessage: (message: ChatMessage) => void
  generateDiagram: (prompt: string) => Promise<void>
  modifyDiagram: (prompt: string) => Promise<void>
}

export const useDiagramStore = create<DiagramState>()(
  persist(
    (set, get) => ({
      code: '',
      notationType: 'mermaid',
      isDarkMode: false,
      chatHistory: [],
      setCode: (code: string) => set({ code }),
      setNotationType: (notationType: NotationType) => set({ notationType }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      addChatMessage: (message: ChatMessage) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
      generateDiagram: async (prompt: string) => {
        const { notationType, addChatMessage } = get()
        try {
          addChatMessage({ role: 'user', content: prompt })
          const newCode = await generateDiagram(prompt, notationType)
          set({ code: newCode })
          addChatMessage({ role: 'assistant', content: 'Diagram generated successfully.' })
        } catch (error) {
          console.error('Error generating diagram:', error)
          addChatMessage({ role: 'assistant', content: 'Error generating diagram. Please try again.' })
          throw error
        }
      },
      modifyDiagram: async (prompt: string) => {
        const { code, notationType, addChatMessage } = get()
        try {
          addChatMessage({ role: 'user', content: prompt })
          const newCode = await modifyDiagram(code, prompt, notationType)
          set({ code: newCode })
          addChatMessage({ role: 'assistant', content: 'Diagram modified successfully.' })
        } catch (error) {
          console.error('Error modifying diagram:', error)
          addChatMessage({ role: 'assistant', content: 'Error modifying diagram. Please try again.' })
          throw error
        }
      },
    }),
    {
      name: 'diagram-storage',
    }
  )
)

