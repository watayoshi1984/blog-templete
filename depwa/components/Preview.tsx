import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { useDiagramStore } from '@/lib/store'

export default function Preview() {
  const { code, notationType } = useDiagramStore()
  const previewRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!code.trim()) {
      if (previewRef.current) {
        previewRef.current.innerHTML = `<p>Enter ${notationType} code to see the preview.</p>`
      }
      setError(null)
      return
    }

    const renderDiagram = async () => {
      if (notationType === 'mermaid') {
        try {
          mermaid.initialize({ startOnLoad: true, theme: 'neutral' })
          const { svg } = await mermaid.render('preview', code)
          if (previewRef.current) {
            previewRef.current.innerHTML = svg
            setError(null)
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error)
          setError('Error rendering diagram. Please check your syntax.')
        }
      } else if (notationType === 'plantuml') {
        const encodedCode = encodeURIComponent(code)
        const plantUmlUrl = `https://www.plantuml.com/plantuml/svg/${encodedCode}`
        if (previewRef.current) {
          previewRef.current.innerHTML = `<img src="${plantUmlUrl}" alt="PlantUML Diagram" />`
          setError(null)
        }
      }
    }

    renderDiagram()
  }, [code, notationType])

  return (
    <div className="border rounded-md p-4 h-[calc(100vh-200px)] overflow-auto">
      {error ? (
        <p className="text-red-500 dark:text-red-400">{error}</p>
      ) : (
        <div ref={previewRef}></div>
      )}
    </div>
  )
}

