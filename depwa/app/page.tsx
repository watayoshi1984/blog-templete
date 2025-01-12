'use client'

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { DiagramToggle } from '@/components/diagram-toggle';
import Mermaid from '@/components/mermaid';
import PlantUML from '@/components/plantuml';
import { generateDiagram } from '@/lib/gemini';
import { DiagramType } from '@/lib/types';
import { Clipboard, Download } from 'lucide-react';
import dynamic from 'next/dynamic';

// シンタックスハイライター
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const INITIAL_MERMAID_CODE = `graph TD
    %% テストダイアグラム
    A["開始"] --> B["処理1"]
    B --> C{"条件分岐"}
    C -->|"はい"| D["処理2"]
    C -->|"いいえ"| E["処理3"]
    D --> F["終了"]
    E --> F`;

// クライアントサイドでのみレンダリング
const DynamicMermaid = dynamic(() => import('@/components/mermaid'), { ssr: false });
const DynamicPlantUML = dynamic(() => import('@/components/plantuml'), { ssr: false });

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [diagramType, setDiagramType] = useState<DiagramType>('mermaid');
  const [diagramCode, setDiagramCode] = useState(INITIAL_MERMAID_CODE);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  const handleCodeChange = (value: string) => {
    setDiagramCode(value);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(diagramCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadImage = async (format: 'png' | 'svg') => {
    const svgElement = document.querySelector('.mermaid svg, .plantuml img') as SVGElement | HTMLImageElement;
    if (!svgElement) return;

    if (format === 'svg') {
      const svgData = svgElement instanceof SVGElement 
        ? new XMLSerializer().serializeToString(svgElement)
        : await fetch(svgElement.src).then(res => res.text());
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagram.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      if (svgElement instanceof SVGElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      } else {
        img.src = svgElement.src;
      }

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'diagram.png';
        a.click();
      };
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

          {/* 図の種類切り替え */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-4">
              <DiagramToggle value={diagramType} onChange={setDiagramType} />
              <span className="text-gray-600 font-bold">
                ← ここで図示のスタイルを変更できます
              </span>
            </div>
          </div>

          {/* 入力フォーム */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="図示したい内容を入力してください。例：「ユーザーがログインしてから商品を購入するまでの流れを表すシーケンス図」"
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
                  <DynamicMermaid code={diagramCode} />
                ) : (
                  <DynamicPlantUML code={diagramCode} />
                )}
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => downloadImage('png')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PNG保存
                </button>
                <button
                  onClick={() => downloadImage('svg')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  SVG保存
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">生成されたコード</h2>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
                >
                  <Clipboard className="w-4 h-4 mr-2" />
                  {isCopied ? 'コピーしました！' : 'コピー'}
                </button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language={diagramType === 'mermaid' ? 'mermaid' : 'plantuml'}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    minHeight: '300px',
                  }}
                  onChange={handleCodeChange}
                >
                  {diagramCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

