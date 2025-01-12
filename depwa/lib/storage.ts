export function saveDiagram(code: string, notationType: 'mermaid' | 'plantuml') {
  localStorage.setItem('depwa_code', code)
  localStorage.setItem('depwa_notationType', notationType)
}

export function loadDiagram(): { code: string; notationType: 'mermaid' | 'plantuml' } | null {
  const code = localStorage.getItem('depwa_code')
  const notationType = localStorage.getItem('depwa_notationType') as 'mermaid' | 'plantuml'

  if (code && notationType) {
    return { code, notationType }
  }

  return null
}

