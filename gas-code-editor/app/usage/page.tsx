'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function UsagePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">使い方</h1>
      <ol className="list-decimal list-inside space-y-6">
        <li>
          <strong>マーメイド図の作成：</strong>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>左側のエディターにマーメイド記法でコードを入力します。</li>
            <li>入力したコードは自動的にプレビューエリアに反映されます。</li>
            <li>マーメイド記法の基本：
              <pre className="bg-gray-100 p-2 mt-2 rounded-md">{`graph TD;
A[開始] --> B[処理1];
B --> C[処理2];
C --> D[終了];`}</pre>
              このコードは上から下に流れる簡単なフローチャートを作成します。
            </li>
            <li>AIチャットボットを使用して、マーメイド図の作成をサポートしてもらえます。例：「3つのステップがある業務フローを作成して」</li>
          </ul>
        </li>
        <li>
          <strong>GASコードの作成：</strong>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>下部のGASエディターにコードを入力します。</li>
            <li>GASの基本的な構造：
              <pre className="bg-gray-100 p-2 mt-2 rounded-md">{`function myFunction() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange("A1");
  range.setValue("Hello, World!");
}`}</pre>
              このコードは、アクティブなスプレッドシートのA1セルに「Hello, World!」と入力します。
            </li>
            <li>AIチャットボットを使用して、GASコードの作成をサポートしてもらえます。例：「スプレッドシートの特定の列のデータを取得するスクリプトを書いて」</li>
            <li>「GASコードを作成」ボタンを押すと、Google Apps Scriptの新規プロジェクト作成ページが開きます。</li>
          </ul>
        </li>
        <li>
          <strong>コードの保存：</strong>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>「作業状態を保存する」ボタンを押すと、現在のコードがブラウザに保存されます。</li>
            <li>次回アクセス時に自動的に保存されたコードが読み込まれます。</li>
            <li>注意：ブラウザのキャッシュをクリアすると保存されたコードは失われます。重要なコードは別途バックアップを取ることをおすすめします。</li>
          </ul>
        </li>
        <li>
          <strong>AIチャットボットの使用：</strong>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>各エディターの下にあるチャットボックスに質問や指示を入力します。</li>
            <li>AIが回答を生成し、必要に応じてコードを更新します。</li>
            <li>複雑な質問や要求にも対応できますので、遠慮なく相談してください。</li>
            <li>例えば：
              <ul className="list-disc list-inside ml-8">
                <li>「このマーメイド図に条件分岐を追加してください」</li>
                <li>「GASでGmailの未読メールを取得するスクリプトを作成して」</li>
                <li>「このGASコードにエラーハンドリングを追加してください」</li>
              </ul>
            </li>
          </ul>
        </li>
      </ol>
      <div className="mt-8">
        <Link href="/">
          <Button>ホームに戻る</Button>
        </Link>
      </div>
    </div>
  )
} 