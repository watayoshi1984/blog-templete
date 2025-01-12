'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  code: string;
}

export default function Mermaid({ code }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        logLevel: 'error',
        fontFamily: 'sans-serif',
        flowchart: {
          htmlLabels: true,
          curve: 'linear',
        },
      });

      const renderDiagram = async () => {
        try {
          const processedCode = code.trim().replace(/^```mermaid\n/, '').replace(/```$/, '');
          
          containerRef.current!.innerHTML = '';
          
          const { svg } = await mermaid.render('mermaid-diagram', processedCode);
          
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Error rendering Mermaid diagram:', error);
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="p-4 text-red-500 bg-red-50 rounded-lg">
                図の生成に失敗しました。構文を確認してください。
                <pre class="mt-2 text-sm">${error instanceof Error ? error.message : '不明なエラー'}</pre>
              </div>
            `;
          }
        }
      };

      renderDiagram();
    }
  }, [code]);

  return <div ref={containerRef} className="mermaid w-full" />;
} 