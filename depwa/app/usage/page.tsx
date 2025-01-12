'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import Mermaid from '@/components/mermaid';
import PlantUML from '@/components/plantuml';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const MERMAID_SAMPLES = [
  {
    title: 'フローチャート',
    description: '処理の流れを表現する図',
    code: `graph TD
    A[開始] --> B[入力]
    B --> C{条件分岐}
    C -->|Yes| D[処理1]
    C -->|No| E[処理2]
    D --> F[終了]
    E --> F`,
  },
  {
    title: 'シーケンス図',
    description: '時系列に沿った処理の流れを表現する図',
    code: `sequenceDiagram
    participant ユーザー
    participant システム
    participant データベース
    
    ユーザー->>システム: ログインリクエスト
    システム->>データベース: 認証確認
    データベース-->>システム: 認証結果
    システム-->>ユーザー: ログイン成功`,
  },
  {
    title: 'クラス図',
    description: 'クラス間の関係を表現する図',
    code: `classDiagram
    class User {
      +String name
      +String email
      +login()
      +logout()
    }
    class Order {
      +int orderId
      +Date orderDate
      +process()
    }
    User "1" --> "*" Order: places`,
  },
];

const PLANTUML_SAMPLES = [
  {
    title: 'ユースケース図',
    description: 'システムの利用シーンを表現する図',
    code: `@startuml
actor ユーザー
rectangle システム {
  usecase "ログイン" as UC1
  usecase "商品検索" as UC2
  usecase "注文" as UC3
}
ユーザー --> UC1
ユーザー --> UC2
ユーザー --> UC3
@enduml`,
  },
  {
    title: 'コンポーネント図',
    description: 'システムの構成要素を表現する図',
    code: `@startuml
package "フロントエンド" {
  [Webブラウザ]
}
package "バックエンド" {
  [APIサーバー]
  [データベース]
}
[Webブラウザ] --> [APIサーバー]: HTTP
[APIサーバー] --> [データベース]: SQL
@enduml`,
  },
];

const TROUBLESHOOTING = [
  {
    issue: '図が表示されない',
    solutions: [
      '構文が正しいか確認してください',
      '閉じ括弧や引用符が適切に設定されているか確認してください',
      '日本語を使用する場合は、必ず引用符（""）で囲んでください',
    ],
  },
  {
    issue: '矢印や線が期待通りに表示されない',
    solutions: [
      '矢印の種類（-->, ===>, ..など）が正しく指定されているか確認してください',
      'ノード間の接続が正しく定義されているか確認してください',
    ],
  },
  {
    issue: 'レイアウトが崩れる',
    solutions: [
      'ノードのIDが重複していないか確認してください',
      '長いテキストは改行を入れて調整してください',
      'サブグラフを使用して関連する要素をグループ化することで改善できます',
    ],
  },
];

export default function UsagePage() {
  const [activeTab, setActiveTab] = useState('mermaid');

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-8">
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold mb-8">使い方ガイド</h1>
            
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">図の種類と使い分け</h2>
              <p className="text-gray-600 mb-6">
                Diagram AIでは、MermaidとPlantUMLの2種類の記法をサポートしています。
                それぞれの特徴を理解し、用途に応じて使い分けることで、より効果的な図の作成が可能です。
              </p>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="mermaid">Mermaid</TabsTrigger>
                  <TabsTrigger value="plantuml">PlantUML</TabsTrigger>
                </TabsList>

                <TabsContent value="mermaid">
                  <div className="space-y-8">
                    {MERMAID_SAMPLES.map((sample, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">{sample.title}</h3>
                        <p className="text-gray-600 mb-4">{sample.description}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">コード</h4>
                            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                              <code>{sample.code}</code>
                            </pre>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">プレビュー</h4>
                            <Mermaid code={sample.code} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="plantuml">
                  <div className="space-y-8">
                    {PLANTUML_SAMPLES.map((sample, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">{sample.title}</h3>
                        <p className="text-gray-600 mb-4">{sample.description}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">コード</h4>
                            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                              <code>{sample.code}</code>
                            </pre>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">プレビュー</h4>
                            <PlantUML code={sample.code} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">トラブルシューティング</h2>
              <div className="space-y-4">
                {TROUBLESHOOTING.map((item, index) => (
                  <Alert key={index}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{item.issue}</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside mt-2">
                        {item.solutions.map((solution, sIndex) => (
                          <li key={sIndex}>{solution}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">ベストプラクティス</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>図の見やすさを重視</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside mt-2">
                      <li>適切な余白とスペースを確保</li>
                      <li>関連する要素をグループ化</li>
                      <li>色やスタイルを効果的に使用</li>
                    </ul>
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>メンテナンス性を考慮</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside mt-2">
                      <li>適切なコメントを追加</li>
                      <li>命名規則を統一</li>
                      <li>モジュール化を意識</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

