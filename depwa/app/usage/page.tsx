'use client';

import { Sidebar } from '@/components/ui/sidebar';

export default function UsagePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold mb-8">使い方ガイド</h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. 基本的な使い方</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
              <h3 className="text-xl font-medium">図の生成手順</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>画面上部の入力欄に、作成したい図の説明を日本語で入力します</li>
                <li>必要に応じて、MermaidとPlantUMLを切り替えます</li>
                <li>「図を生成」ボタンをクリックします</li>
                <li>生成された図が表示され、下部にコードも表示されます</li>
              </ol>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. 図の種類と用途</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-medium mb-4">Mermaid</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>フローチャート: プロセスの流れを表現</li>
                  <li>シーケンス図: 時系列の処理を表現</li>
                  <li>クラス図: システムの構造を表現</li>
                  <li>状態遷移図: 状態の変化を表現</li>
                  <li>ER図: データベースの設計を表現</li>
                  <li>ガントチャート: プロジェクトの計画を表現</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-medium mb-4">PlantUML</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>クラス図: より詳細なシステム構造を表現</li>
                  <li>シーケンス図: 複雑な相互作用を表現</li>
                  <li>ユースケース図: システムの機能を表現</li>
                  <li>アクティビティ図: 業務フローを表現</li>
                  <li>コンポーネント図: システムの構成を表現</li>
                  <li>状態遷移図: 詳細な状態管理を表現</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. 効果的な図の作成のコツ</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li>目的を明確にして、適切な図の種類を選択する</li>
                <li>シンプルで分かりやすい説明を心がける</li>
                <li>必要に応じて日本語でコメントを追加する</li>
                <li>色やスタイルを活用して、重要な部分を強調する</li>
                <li>大きな図は適切に分割して表現する</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. トラブルシューティング</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium">図が生成されない場合</h3>
                  <ul className="list-disc list-inside mt-2">
                    <li>入力文が具体的で明確か確認する</li>
                    <li>選択した図の種類が適切か確認する</li>
                    <li>ページを更新して再試行する</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium">図が崩れて表示される場合</h3>
                  <ul className="list-disc list-inside mt-2">
                    <li>図の複雑さを軽減する</li>
                    <li>日本語の文字コードを確認する</li>
                    <li>別の図の種類での表現を検討する</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

