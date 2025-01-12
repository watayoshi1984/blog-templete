import Link from 'next/link'

export default function UsagePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">使い方</h1>
      <ol className="list-decimal list-inside space-y-2">
        <li>エディタ領域にMermaidまたはPlantUML記法でダイアグラムを記述します。</li>
        <li>記法タイプを選択し、MermaidとPlantUMLを切り替えることができます。</li>
        <li>プレビュー領域で、リアルタイムにダイアグラムの表示を確認できます。</li>
        <li>Gemini AIを使用して、ダイアグラムの生成や修正の支援を受けられます。</li>
        <li>作成したダイアグラムは自動的に保存され、次回アクセス時に復元されます。</li>
      </ol>
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}

