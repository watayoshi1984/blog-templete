import React, { useCallback, useEffect, useState } from 'react'
import { useDiagramStore, NotationType } from '@/lib/store'
import dynamic from 'next/dynamic'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { Toggle } from "@/components/ui/toggle"
import { Extension } from '@codemirror/state'

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false })

export default function Editor() {
  const { code, setCode, notationType, setNotationType, isDarkMode } = useDiagramStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onChange = useCallback((value: string) => {
    setCode(value)
  }, [setCode])

  const toggleNotationType = useCallback(() => {
    setNotationType(notationType === 'mermaid' ? 'plantuml' : 'mermaid')
  }, [notationType, setNotationType])

  const extensions = React.useMemo<Extension[]>(() => [javascript(), EditorView.lineWrapping], [])

  if (!mounted) return null

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Toggle
          pressed={notationType === 'plantuml'}
          onPressedChange={toggleNotationType}
        >
          {notationType === 'mermaid' ? 'Mermaid' : 'PlantUML'}
        </Toggle>
      </div>
      <CodeMirror
        value={code}
        height="300px"
        theme={isDarkMode ? 'dark' : 'light'}
        extensions={extensions}
        onChange={onChange}
        className="border rounded-md overflow-hidden"
      />
    </div>
  )
}

