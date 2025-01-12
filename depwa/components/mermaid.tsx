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
      });
      
      try {
        containerRef.current.innerHTML = '';
        mermaid.render('mermaid-diagram', code).then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        });
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = 'Error rendering diagram';
        }
      }
    }
  }, [code]);

  return <div ref={containerRef} className="mermaid" />;
} 