'use client'

import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { DiagramToggle } from '@/components/diagram-toggle';
import Mermaid from '@/components/mermaid';
import PlantUML from '@/components/plantuml';
import { generateDiagram } from '@/lib/gemini';
import { DiagramType } from '@/lib/types';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';

export default function Home() {
  const [diagramType, setDiagramType] = useState<DiagramType>('mermaid');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagramCode, setDiagramCode] = useState('');

  const handleSubmit = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
      const result = await generateDiagram(prompt, diagramType);
      if (result) {
        setDiagramCode(result);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="space-y-4">
              <DiagramToggle
                value={diagramType}
                onChange={setDiagramType}
              />
              <div className="flex flex-col space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="図の説明を入力してください..."
                  className="w-full h-32 p-4 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isLoading ? '生成中...' : '図を生成'}
                </button>
              </div>
            </div>
          </ResizablePanel>
          <ResizablePanel defaultSize={50}>
            <div className="h-full">
              {diagramCode && (
                <div className="space-y-4">
                  <div className="diagram-preview">
                    {diagramType === 'mermaid' ? (
                      <Mermaid code={diagramCode} />
                    ) : (
                      <PlantUML code={diagramCode} />
                    )}
                  </div>
                  <div className="diagram-code">
                    <pre>{diagramCode}</pre>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}

