'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  code: string;
}

export default function Mermaid({ code }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      logLevel: 'error',
      securityLevel: 'loose',
      fontFamily: 'sans-serif',
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
      },
    });

    const renderDiagram = async () => {
      if (!containerRef.current) return;
      setIsLoading(true);

      try {
        // コンテナをクリア
        containerRef.current.innerHTML = '';
        
        // コードをトリムして不要な空白を削除
        const trimmedCode = code.trim();
        
        // Mermaid形式のコードブロックを抽出（もし存在する場合）
        const mermaidCode = trimmedCode.replace(/^```mermaid\n([\s\S]*?)```$/m, '$1').trim();

        // 図を生成
        const { svg } = await mermaid.render('mermaid-diagram', mermaidCode);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = '<div class="text-red-500">図の生成に失敗しました。構文を確認してください。</div>';
        }
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [code]);

  if (isLoading) {
    return (
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">図を生成中...</span>
      </div>
    );
  }

  return <div ref={containerRef} className="mermaid overflow-x-auto" />;
} 