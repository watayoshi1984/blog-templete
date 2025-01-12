'use client';

import { useEffect, useState } from 'react';
import plantumlEncoder from 'plantuml-encoder';

interface PlantUMLProps {
  code: string;
}

export default function PlantUML({ code }: PlantUMLProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      // コードをトリムして不要な空白を削除
      const trimmedCode = code.trim();
      
      // PlantUML形式のコードブロックを抽出（もし存在する場合）
      const plantUmlCode = trimmedCode.replace(/^```plantuml\n([\s\S]*?)```$/m, '$1').trim();

      // コードをエンコード
      const encoded = plantumlEncoder.encode(plantUmlCode);
      
      // 画像URLを生成
      setImageUrl(`https://www.plantuml.com/plantuml/svg/${encoded}`);
      setError('');
    } catch (err) {
      console.error('Error encoding PlantUML:', err);
      setError('図の生成に失敗しました。構文を確認してください。');
    }
  }, [code]);

  return (
    <div className="plantuml">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <img src={imageUrl} alt="PlantUML diagram" className="max-w-full" />
      )}
    </div>
  );
} 