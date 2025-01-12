import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import { useDiagramStore } from '@/lib/store'
import { useToast } from "@/components/ui/use-toast"

export default function GeminiIntegration() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { generateDiagram, modifyDiagram } = useDiagramStore()
  const { toast } = useToast()

  const handleGeminiRequest = async (action: 'generate' | 'modify') => {
    setIsLoading(true)
    try {
      if (action === 'generate') {
        await generateDiagram(prompt)
      } else {
        await modifyDiagram(prompt)
      }
      toast({
        title: "Success",
        description: `Diagram ${action === 'generate' ? 'generated' : 'modified'} successfully.`,
      })
    } catch (error) {
      console.error('Error with Gemini API:', error)
      toast({
        title: "Error",
        description: "An error occurred while processing your request.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setPrompt('')
    }
  }

  return (
    <div className="space-y-2">
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Gemini AIへの指示を入力..."
        className="bg-gray-50 dark:bg-gray-700"
      />
      <div className="flex space-x-2">
        <Button onClick={() => handleGeminiRequest('generate')} className="flex-1" disabled={isLoading || !prompt.trim()}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          生成
        </Button>
        <Button onClick={() => handleGeminiRequest('modify')} className="flex-1" disabled={isLoading || !prompt.trim()}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          修正
        </Button>
      </div>
    </div>
  )
}

