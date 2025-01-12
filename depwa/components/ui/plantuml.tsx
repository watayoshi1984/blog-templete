import { useEffect, useState } from 'react';
import { encode } from 'plantuml-encoder';

interface PlantUMLProps {
  code: string;
}

export default function PlantUML({ code }: PlantUMLProps) {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    try {
      const encoded = encode(code);
      setImageUrl(`https://www.plantuml.com/plantuml/svg/${encoded}`);
    } catch (error) {
      console.error('PlantUML encoding error:', error);
    }
  }, [code]);

  return imageUrl ? (
    <img
      src={imageUrl}
      alt="PlantUML diagram"
      className="max-w-full h-auto"
    />
  ) : (
    <div className="text-red-500">図の生成に失敗しました</div>
  );
} 