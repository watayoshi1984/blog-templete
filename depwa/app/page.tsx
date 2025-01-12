'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DiagramToggle } from "@/components/diagram-toggle";
import { generateDiagram } from "@/lib/gemini";
import { DiagramType, DiagramState } from "@/lib/types";
import Mermaid from "@/components/ui/mermaid";
import PlantUML from "@/components/ui/plantuml";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [diagramState, setDiagramState] = useState<DiagramState>({
    type: 'mermaid',
    code: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateDiagram(prompt, diagramState.type);
      
      if (response.error) {
        setError(response.error);
      } else {
        setDiagramState(prev => ({
          ...prev,
          code: response.text
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiagramTypeChange = (type: DiagramType) => {
    setDiagramState(prev => ({
      type,
      code: ''  // 図の種類が変更されたら、コードをリセット
    }));
  };

  return (
    <main className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Diagram Generator</h1>
        <DiagramToggle
          value={diagramState.type}
          onChange={handleDiagramTypeChange}
        />
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="図の説明を入力してください..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
        />
        
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? '生成中...' : '図を生成'}
        </Button>

        {error && (
          <div className="text-red-500 p-4 rounded bg-red-50">
            {error}
          </div>
        )}

        {diagramState.code && (
          <div className="p-4 rounded bg-gray-50">
            {diagramState.type === 'mermaid' ? (
              <Mermaid code={diagramState.code} />
            ) : (
              <PlantUML code={diagramState.code} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

