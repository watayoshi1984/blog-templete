'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { DiagramToggle } from '@/components/diagram-toggle';
import dynamic from 'next/dynamic';
import PlantUML from '@/components/plantuml';
import { generateDiagram } from '@/lib/gemini';
import { DiagramType } from '@/lib/types';
import { Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, RefreshCw, LightbulbIcon, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// シンタックスハイライター
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const INITIAL_MERMAID_CODE = `graph TD
    %% カラーコードを含むテストダイアグラム
    A["開始"] --> B["処理1"]
    B --> C{"条件分岐"}
    C -->|"はい"| D["処理2"]
    C -->|"いいえ"| E["処理3"]
    D --> F["終了"]
    E --> F

    %% スタイルの適用
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#33f,stroke-width:2px
    style F fill:#bfb,stroke:#3b3,stroke-width:2px`;

// クライアントサイドでのみレンダリング
const DynamicPlantUML = dynamic(() => import('@/components/plantuml'), { ssr: false });

// SyntaxHighlighterの型定義を追加
interface SyntaxHighlighterProps {
  language: string;
  style: any;
  customStyle?: React.CSSProperties;
  children: string;
  onChange?: (value: string) => void;
}

const Mermaid = dynamic(() => import('@/components/mermaid'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse flex items-center justify-center">
      <span className="text-gray-500 dark:text-gray-400">図を生成中...</span>
    </div>
  ),
});

// エラーメッセージの定義
const DIAGRAM_ERRORS = {
  syntax: {
    title: '構文エラー',
    description: '図の記法に誤りがあります。\n• 記号（矢印、括弧など）の使い方を確認してください\n• 長い文字列は改行してください\n• インデントを正しく設定してください'
  },
  connection: {
    title: '通信エラー',
    description: 'APIとの通信に失敗しました。\n• インターネット接続を確認してください\n• しばらく待ってから再度お試しください'
  },
  invalid: {
    title: '入力エラー',
    description: '入力内容が正しくありません。\n• 選択した図の種類に合わせた記法で入力してください\n• 必要な情報がすべて含まれているか確認してください'
  }
};

// ヒントの定義
const DIAGRAM_HINTS = {
  title: '図の作成のヒント',
  description: `1. まず、作成したい図の種類を選択します
2. 図の要素（ノード、関係性など）を書き出します
3. 要素間のつながりを矢印で表現します
4. 必要に応じて、グループ化やスタイルを適用します
5. プレビューを確認しながら、見やすさを調整します

※ 複雑な図は、段階的に作成することをお勧めします。`
};

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [diagramType, setDiagramType] = useState<DiagramType>('mermaid');
  const [diagramCode, setDiagramCode] = useState(INITIAL_MERMAID_CODE);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [manualUpdate, setManualUpdate] = useState(false);
  const [error, setError] = useState<keyof typeof DIAGRAM_ERRORS | null>(null);
  const [showHint, setShowHint] = useState(false);

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

  const handleCodeChange = (newCode: string) => {
    setDiagramCode(newCode);
    setError(null);
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
    try {
      const svgElement = document.querySelector('.mermaid svg, .plantuml img') as SVGElement | HTMLImageElement;
      if (!svgElement) {
        throw new Error('図の要素が見つかりません。図が正しく生成されているか確認してください。');
      }

      if (format === 'svg') {
        try {
          const svgData = svgElement instanceof SVGElement 
            ? new XMLSerializer().serializeToString(svgElement)
            : await fetch(svgElement.src).then(res => {
                if (!res.ok) throw new Error('SVGデータの取得に失敗しました。');
                return res.text();
              });
          
          const blob = new Blob([svgData], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `diagram.svg`;
          a.click();
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error('SVG download error:', error);
          alert('SVGファイルのダウンロードに失敗しました。もう一度お試しください。');
        }
      } else {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('キャンバスコンテキストの取得に失敗しました。');
          }

          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          if (svgElement instanceof SVGElement) {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
          } else {
            img.src = svgElement.src;
          }

          img.onload = () => {
            const width = 640;
            const height = (img.height / img.width) * width;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            try {
              const a = document.createElement('a');
              a.href = canvas.toDataURL('image/png');
              a.download = 'diagram.png';
              a.click();
            } catch (error) {
              console.error('PNG conversion error:', error);
              alert('PNGファイルの生成に失敗しました。もう一度お試しください。');
            }
          };

          img.onerror = () => {
            throw new Error('画像の読み込みに失敗しました。');
          };
        } catch (error) {
          console.error('PNG download error:', error);
          alert('PNGファイルのダウンロードに失敗しました。もう一度お試しください。');
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      alert(error instanceof Error ? error.message : 'ダウンロードに失敗しました。もう一度お試しください。');
    }
  };

  const handleManualUpdate = async () => {
    setManualUpdate(true);
    try {
      const result = await generateDiagram(prompt, diagramType);
      setDiagramCode(result);
      setError(null);
    } catch (error: any) {
      if (error.message.includes('syntax')) {
        setError('syntax');
      } else if (error.message.includes('network')) {
        setError('connection');
      } else {
        setError('invalid');
      }
    } finally {
      setManualUpdate(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto" role="main">
        <div className="container mx-auto p-4">
          <header className="mb-8 text-center" role="banner">
            <h1 className="text-3xl font-bold mb-2">AIが支援！</h1>
            <p className="text-gray-600 dark:text-gray-400">
              マーメイド記法・PlantUMLの作図をAIが支援！
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <div className="mb-4">
                <DiagramToggle value={diagramType} onChange={setDiagramType} />
              </div>
              
              <div className="relative">
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">生成されたコード</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      aria-label="コードをコピー"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {isCopied ? 'コピーしました' : 'コピー'}
                    </Button>
                  </div>

                  <div className="relative">
                    <SyntaxHighlighter
                      language="markdown"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        backgroundColor: 'var(--syntax-bg)',
                      }}
                      role="code"
                      aria-label="生成されたコード"
                    >
                      {diagramCode}
                    </SyntaxHighlighter>
                  </div>

                  <div className="mt-4">
                    <Button
                      onClick={handleManualUpdate}
                      disabled={manualUpdate}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      aria-label="プレビューを更新"
                    >
                      {manualUpdate ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          更新中...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          プレビューを更新
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pl-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">プレビュー</h2>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadImage('png')}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                      aria-label="PNGでダウンロード"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PNG
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadImage('svg')}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                      aria-label="SVGでダウンロード"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      SVG
                    </Button>
                  </div>
                </div>

                <div className="relative min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  {diagramType === 'mermaid' ? (
                    <Mermaid code={diagramCode} />
                  ) : (
                    <DynamicPlantUML code={diagramCode} />
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 relative">
              <div className="absolute top-2 right-2 z-10">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowHint(true)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                        aria-label="ヒントを表示"
                      >
                        <LightbulbIcon className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ヒントを表示</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <textarea
                value={prompt}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                placeholder="図の説明を入力してください..."
                className="w-full h-32 p-4 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                role="textbox"
                aria-label="図の説明入力欄"
              />

              <div className="mt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  aria-label="図を生成"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    '図を生成'
                  )}
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>{DIAGRAM_ERRORS[error].title}</AlertTitle>
              <AlertDescription className="whitespace-pre-line">
                {DIAGRAM_ERRORS[error].description}
              </AlertDescription>
            </Alert>
          )}

          {showHint && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
                <h3 className="text-xl font-semibold mb-4">{DIAGRAM_HINTS.title}</h3>
                <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">
                  {DIAGRAM_HINTS.description}
                </p>
                <Button
                  className="mt-4 w-full"
                  onClick={() => setShowHint(false)}
                  aria-label="ヒントを閉じる"
                >
                  閉じる
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

