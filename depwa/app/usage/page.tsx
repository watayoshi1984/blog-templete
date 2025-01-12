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
    description: '処理の流れを表現する図。システムの処理フローやビジネスプロセスの可視化に最適です。',
    code: `graph TD
    A[開始] --> B[ユーザー入力]
    B --> C{入力チェック}
    C -->|OK| D[データ処理]
    C -->|NG| E[エラー表示]
    D --> F[結果表示]
    E --> B
    F --> G[終了]`,
  },
  {
    title: 'シーケンス図',
    description: '時系列に沿った処理の流れを表現する図。システム間の通信やユーザーとシステムの対話を表現できます。',
    code: `sequenceDiagram
    actor User as ユーザー
    participant Front as フロントエンド
    participant API as APIサーバー
    participant DB as データベース
    
    User->>Front: ログイン画面を開く
    Front->>API: 認証リクエスト
    API->>DB: ユーザー情報確認
    DB-->>API: ユーザー情報返却
    API-->>Front: 認証結果返却
    Front-->>User: ログイン完了画面表示`,
  },
  {
    title: 'クラス図',
    description: 'クラス間の関係を表現する図。オブジェクト指向設計で使用され、システムの構造を表現します。',
    code: `classDiagram
    class User {
      +String name
      +String email
      +String password
      +login()
      +logout()
      +updateProfile()
    }
    class Order {
      +int orderId
      +Date orderDate
      +float totalAmount
      +process()
      +cancel()
    }
    class Product {
      +int productId
      +String name
      +float price
      +checkStock()
    }
    User "1" --> "*" Order: places
    Order "*" --> "*" Product: contains`,
  },
  {
    title: 'ER図',
    description: 'エンティティ間の関係を表現する図。データベース設計で使用され、テーブル間の関係を表現します。',
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    
    CUSTOMER {
        int id
        string name
        string email
    }
    ORDER {
        int id
        date created_at
        float total_amount
    }
    ORDER_ITEM {
        int order_id
        int product_id
        int quantity
    }
    PRODUCT {
        int id
        string name
        float price
    }`,
  },
  {
    title: 'ガントチャート',
    description: 'プロジェクトのスケジュールを表現する図。タスクの期間や依存関係を可視化できます。',
    code: `gantt
    title プロジェクトスケジュール
    dateFormat YYYY-MM-DD
    section 企画
    要件定義    :a1, 2024-01-01, 30d
    設計        :a2, after a1, 20d
    section 開発
    実装        :b1, after a2, 40d
    テスト      :b2, after b1, 20d
    section リリース
    デプロイ    :c1, after b2, 10d
    運用開始    :milestone, after c1, 1d`,
  }
];

const PLANTUML_SAMPLES = [
  {
    title: 'ユースケース図',
    description: 'システムの利用シーンを表現する図。ユーザーとシステムの相互作用を表現します。',
    code: `@startuml
left to right direction
actor 利用者
actor 管理者
rectangle システム {
  usecase "ログイン" as UC1
  usecase "商品検索" as UC2
  usecase "商品購入" as UC3
  usecase "在庫管理" as UC4
  usecase "売上分析" as UC5
}
利用者 --> UC1
利用者 --> UC2
利用者 --> UC3
管理者 --> UC1
管理者 --> UC4
管理者 --> UC5
@enduml`,
  },
  {
    title: 'アクティビティ図',
    description: '処理の流れを表現する図。条件分岐や並行処理を含む複雑なフローを表現できます。',
    code: `@startuml
start
:注文を受け付ける;
if (在庫チェック) then (あり)
  :注文処理;
  fork
    :メール送信;
  fork again
    :在庫更新;
  end fork
  :発送準備;
else (なし)
  :在庫切れ通知;
endif
:処理完了;
stop
@enduml`,
  },
  {
    title: 'コンポーネント図',
    description: 'システムの構成要素を表現する図。システムのアーキテクチャを表現します。',
    code: `@startuml
package "フロントエンド" {
  [Webブラウザ]
  [Next.js]
}
package "バックエンド" {
  [APIサーバー]
  [認証サービス]
  database "データベース"
}
cloud {
  [外部API]
}
[Webブラウザ] --> [Next.js]
[Next.js] --> [APIサーバー]: REST
[APIサーバー] --> [認証サービス]: gRPC
[APIサーバー] --> データベース: SQL
[APIサーバー] --> [外部API]: HTTP
@enduml`,
  },
  {
    title: 'ステート図',
    description: '状態遷移を表現する図。オブジェクトの状態変化を表現します。',
    code: `@startuml
[*] --> 未処理
未処理 --> 処理中 : 処理開始
処理中 --> 完了 : 処理成功
処理中 --> エラー : 処理失敗
エラー --> 未処理 : 再試行
完了 --> [*]
@enduml`,
  }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

              <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-100">
                  参考情報
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-100">Mermaid</h4>
                    <p className="text-blue-700 dark:text-blue-200">
                      詳細な構文やオプションについては、
                      <a
                        href="https://mermaid.js.org/intro/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-300"
                      >
                        Mermaid公式サイト
                      </a>
                      をご参照ください。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-100">PlantUML</h4>
                    <p className="text-blue-700 dark:text-blue-200">
                      詳細な構文やオプションについては、
                      <a
                        href="https://plantuml.com/ja/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-300"
                      >
                        PlantUML公式サイト
                      </a>
                      をご参照ください。
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

