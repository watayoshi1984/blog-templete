import Link from 'next/link'

export default function FAQPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">よくある質問 (FAQ)</h1>
      <dl className="space-y-4">
        <div>
          <dt className="font-semibold">Q: DEPWAは無料で使えますか？</dt>
          <dd>A: はい、DEPWAは基本機能を無料で提供しています。ただし、一部の高度な機能は有料プランでのみ利用可能です。</dd>
        </div>
        <div>
          <dt className="font-semibold">Q: オフラインでも使用できますか？</dt>
          <dd>A: はい、PWA（Progressive Web App）として実装されているため、一度アクセスした後はオフラインでも基本的な機能を使用できます。</dd>
        </div>
        <div>
          <dt className="font-semibold">Q: 作成したダイアグラムは自動的に保存されますか？</dt>
          <dd>A: はい、ブラウザのローカルストレージに自動保存されます。ただし、ブラウザのデータをクリアすると失われる可能性があるため、重要なダイアグラムは別途バックアップすることをおすすめします。</dd>
        </div>
      </dl>
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}

