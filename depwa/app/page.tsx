'use client'

import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { DiagramToggle } from '@/components/diagram-toggle';
import Mermaid from '@/components/mermaid';
import PlantUML from '@/components/plantuml';
import { generateDiagram } from '@/lib/gemini';
import { DiagramType } from '@/lib/types';

const INITIAL_MERMAID_CODE = `graph TD
    %% テストダイアグラム
    A["開始"] --> B["処理1"]
    B --> C{"条件分岐"}
    C -->|"はい"| D["処理2"]
    C -->|"いいえ"| E["処理3"]
    D --> F["終了"]
    E --> F`;

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [diagramType, setDiagramType] = useState<DiagramType>('mermaid');
  const [diagramCode, setDiagramCode] = useState(INITIAL_MERMAID_CODE);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const generatedCode = await generateDiagram(prompt, diagramType);
      setDiagramCode(generatedCode);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-8">
          {/* ヘッダー部分 */}
          <div className="text-center mb-8 pt-4">
            <h1 className="text-4xl font-bold mb-4">Diagram AI</h1>
            <p className="text-xl text-gray-600">
              マーメイド記法・PlantUMLの作図をAIが支援！
            </p>
          </div>

          {/* 入力フォーム */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <DiagramToggle value={diagramType} onChange={setDiagramType} />
            </div>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="作成したい図の説明を入力してください。例：「ユーザーがログインしてから商品を購入するまでの流れを表すシーケンス図」"
                className="w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`absolute bottom-4 right-4 px-6 py-2 bg-blue-600 text-white rounded-lg 
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                {isLoading ? '生成中...' : '図を生成'}
              </button>
            </div>
          </form>

          {/* プレビューとコード */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">プレビュー</h2>
              <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px]">
                {diagramType === 'mermaid' ? (
                  <Mermaid code={diagramCode} />
                ) : (
                  <PlantUML code={diagramCode} />
                )}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">生成されたコード</h2>
              <pre className="border rounded-lg p-4 bg-gray-50 overflow-auto min-h-[300px]">
                <code>{diagramCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

