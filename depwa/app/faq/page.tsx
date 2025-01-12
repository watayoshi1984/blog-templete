'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQ_ITEMS = [
  {
    question: '図を作成するメリットは何ですか？',
    answer: `図を使用することで、以下のような多くのメリットがあります：

1. 複雑な情報を視覚的に分かりやすく表現できます
2. チーム内でのコミュニケーションが円滑になります
3. 問題点や改善点を早期に発見できます
4. ドキュメントの品質が向上します
5. 保守性と再利用性が高まります

特に、システム設計やビジネスプロセスの説明において、図は非常に効果的なツールとなります。`,
  },
  {
    question: 'MermaidとPlantUMLはどのように使い分ければよいですか？',
    answer: `以下のような特徴を考慮して使い分けることをお勧めします：

Mermaidの特徴：
- シンプルで直感的な構文
- GitHubでの表示が可能
- フローチャートやシーケンス図が得意
- 軽量で高速な描画

PlantUMLの特徴：
- より詳細な図が作成可能
- 豊富な図の種類
- 企業での利用実績が豊富
- 複雑なシステム設計に適している

一般的に、簡単な図やGitHubでの表示が必要な場合はMermaid、詳細な設計図が必要な場合はPlantUMLを選択することをお勧めします。`,
  },
  {
    question: '図の作成に時間がかかりすぎる場合はどうすればよいですか？',
    answer: `以下のアプローチを試してみてください：

1. 最初は簡単な図から始める
   - 核となる要素だけを含めた基本的な図を作成
   - 徐々に詳細を追加していく

2. テンプレートを活用する
   - 使い方ページのサンプルコードを参考にする
   - よく使う図のパターンを保存しておく

3. AIの支援を最大限活用する
   - 明確で具体的な説明を入力する
   - 生成された図を基に微調整を行う

4. 図を適切に分割する
   - 大きな図は複数の小さな図に分割
   - 各図の関係性を明確にする`,
  },
  {
    question: '生成された図の品質を向上させるにはどうすればよいですか？',
    answer: `以下のポイントに注意して図を改善できます：

1. 入力の質を高める
   - 具体的で明確な説明を心がける
   - 図の目的や対象を明確にする

2. デザインの原則を適用する
   - 適切な余白とスペースを確保
   - 色やスタイルを効果的に使用
   - 関連する要素をグループ化

3. フィードバックを活用する
   - 生成された図を見直し、必要に応じて修正
   - チームメンバーからのフィードバックを取り入れる

4. ベストプラクティスを参考にする
   - 使い方ページのガイドラインを参照
   - 業界標準や一般的な表記法に従う`,
  },
  {
    question: '図の作成で注意すべき点は何ですか？',
    answer: `以下の点に注意して図を作成することをお勧めします：

1. 情報の過密を避ける
   - 必要最小限の情報に絞る
   - 複雑な図は適切に分割する

2. 一貫性を保つ
   - 命名規則を統一する
   - 表記方法を統一する
   - スタイルを統一する

3. メンテナンス性を考慮する
   - 適切なコメントを追加する
   - モジュール化を意識する
   - 更新しやすい構造にする

4. セキュリティに配慮する
   - 機密情報を含めない
   - 必要に応じて抽象化する`,
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-8">
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold mb-8">よくある質問</h1>
            
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none"
                  >
                    <h2 className="text-xl font-semibold">{item.question}</h2>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 transform transition-transform duration-200',
                        openItems.includes(index) ? 'rotate-180' : ''
                      )}
                    />
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 py-4 bg-gray-50">
                      <div className="prose max-w-none">
                        {item.answer.split('\n\n').map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="mb-4 last:mb-0 whitespace-pre-wrap"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

