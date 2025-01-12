'use client';

import { useEffect, useState } from 'react';
import plantumlEncoder from 'plantuml-encoder';

interface PlantUMLProps {
  code: string;
}

export default function PlantUML({ code }: PlantUMLProps) {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    try {
      const encoded = plantumlEncoder.encode(code);
      setImageUrl(`https://www.plantuml.com/plantuml/svg/${encoded}`);
    } catch (error) {
      console.error('Error encoding PlantUML:', error);
    }
  }, [code]);

  return (
    <div className="plantuml">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="PlantUML diagram"
          className="max-w-full h-auto"
        />
      ) : (
        <div className="text-red-500">Error rendering diagram</div>
      )}
    </div>
  );
} 