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
      });
      
      try {
        containerRef.current.innerHTML = code;
        mermaid.contentLoaded();
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = '図の生成に失敗しました';
        }
      }
    }
  }, [code]);

  return <div ref={containerRef} className="mermaid" />;
} 