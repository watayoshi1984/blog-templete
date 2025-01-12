'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'どのような図が作成できますか？',
    answer: `
      Mermaidでは以下の図が作成できます：
      • フローチャート（プロセスの流れ）
      • シーケンス図（時系列の処理）
      • クラス図（システムの構造）
      • 状態遷移図（状態の変化）
      • ER図（データベース設計）
      • ガントチャート（プロジェクト計画）

      PlantUMLでは以下の図が作成できます：
      • クラス図（詳細なシステム構造）
      • シーケンス図（複雑な相互作用）
      • ユースケース図（システム機能）
      • アクティビティ図（業務フロー）
      • コンポーネント図（システム構成）
      • 状態遷移図（詳細な状態管理）
    `,
  },
  {
    question: '図の生成に時間がかかる場合はどうすればよいですか？',
    answer: `
      以下の対処方法を試してください：
      1. 入力する説明文をより簡潔にする
      2. 図の複雑さを軽減する
      3. ブラウザをリフレッシュする
      4. 別の時間帯に試す

      また、大規模な図を作成する場合は、複数の小さな図に分割することをお勧めします。
    `,
  },
  {
    question: 'MermaidとPlantUMLの違いは何ですか？',
    answer: `
      主な違いは以下の通りです：

      Mermaid:
      • シンプルで直感的な構文
      • Web上での表示が容易
      • リアルタイムのプレビューが可能
      • 基本的な図の作成に適している

      PlantUML:
      • より詳細な図の作成が可能
      • 豊富な図の種類とオプション
      • 企業での利用実績が豊富
      • 複雑なシステム設計に適している
    `,
  },
  {
    question: '生成された図を編集することはできますか？',
    answer: `
      はい、以下の方法で編集が可能です：

      1. 生成された図の下部に表示されるコードを直接編集
      2. 新しい説明文を入力して再生成
      3. 既存の図に対して修正指示を出す

      また、生成された図は画像としてダウンロードすることも可能です。
    `,
  },
  {
    question: '図の生成に失敗する場合の対処方法は？',
    answer: `
      以下の手順で対処してください：

      1. エラーメッセージを確認する
      2. 入力文が明確で具体的か確認する
      3. 選択した図の種類が適切か確認する
      4. 文法やフォーマットが正しいか確認する
      5. ブラウザをリフレッシュして再試行する

      問題が解決しない場合は、お問い合わせフォームからご連絡ください。
    `,
  },
  {
    question: '推奨されるブラウザや環境はありますか？',
    answer: `
      以下の環境での利用を推奨しています：

      ブラウザ:
      • Google Chrome（最新版）
      • Mozilla Firefox（最新版）
      • Microsoft Edge（最新版）
      • Safari（最新版）

      画面サイズ:
      • デスクトップ: 1280x720以上
      • タブレット: 768x1024以上
      • モバイル: 320x568以上

      注意: Internet Explorer（IE）はサポートしていません。
    `,
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold mb-8">よくある質問（FAQ）</h1>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <h2 className="text-xl font-medium">{faq.question}</h2>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 transition-transform duration-200',
                      openItems.includes(index) ? 'transform rotate-180' : ''
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    openItems.includes(index) ? 'max-h-[1000px]' : 'max-h-0'
                  )}
                >
                  <div className="p-6 pt-0 whitespace-pre-line">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

