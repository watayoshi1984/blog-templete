<!-- Updated 2023-10-11: Enhanced Notion writing guidelines by integrating comprehensive insights from web-sourced research.
Key updates include:
- Best practices for structuring content and organizing notes in Notion.
- Recommendations for effective content linking and tag usage.
- Guidelines to maintain consistency with overall blog writing strategies while leveraging Notion's unique features.
-->

# Notion MCP APIでの記事作成要領

## 1. データベースアイテムの作成

```typescript
// notion_create_database_item の使用例
{
  "database_id": "1913c3e2d6ef80a7bce0c253fb37c24d",
  "properties": {
    "Page": {
      "title": [
        {
          "text": {
            "content": "記事タイトル"
          }
        }
      ]
    },
    "Category": {
      "select": {
        "name": "productivity"
      }
    },
    "Tags": {
      "multi_select": [
        {
          "name": "タグ1"
        },
        {
          "name": "タグ2"
        }
      ]
    },
    "Date": {
      "date": {
        "start": "2025-02-06"
      }
    },
    "Excerpt": {
      "rich_text": [
        {
          "text": {
            "content": "記事の要約文"
          }
        }
      ]
    },
    "Published": {
      "checkbox": ture // 公開設定（原則公開にチェック）
    },
    "FeaturedImage": {
      "files": [] // Featured Image
    },
    "Rank":{
      "number": null // 優先度
    },
    "Slug": {
      "rich_text": [
        {
          "text": {
            "content": "slug" // 半角英数および"-"のみ
          }
        }
      ]
    },
    "post-date": {
      "created_time": "2025-02-05T13:03:00.000Z" // 記事作成日時
    },
    "last-update": {
      "last_edited_time": "2025-02-05T14:12:00.000Z" // 最終更新日時
    }
  }
}
```

## 2. 記事本文の追加

### 基本的なブロック構造
```typescript
// notion_append_block_children の使用例
{
  "block_id": "ページID",
  "children": [
    // メインタイトル（heading_1）
    {
      "object": "block",
      "type": "heading_1",
      "heading_1": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "記事のメインタイトル"
            }
          }
        ]
      }
    },
    // 導入文（paragraph）
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "記事の導入文..."
            }
          }
        ]
      }
    },
    // セクションタイトル（heading_2）
    {
      "object": "block",
      "type": "heading_2",
      "heading_2": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "1. セクションタイトル"
            }
          }
        ]
      }
    }
  ]
}
```

### ブロックタイプ別の使用例

1. **番号付きリスト**
```typescript
{
  "object": "block",
  "type": "numbered_list_item",
  "numbered_list_item": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "リストアイテム"
        }
      }
    ]
  }
}
```

2. **箇条書きリスト**
```typescript
{
  "object": "block",
  "type": "bulleted_list_item",
  "bulleted_list_item": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "箇条書きアイテム"
        }
      }
    ]
  }
}
```

3. **コールアウト**
```typescript
{
  "object": "block",
  "type": "callout",
  "callout": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "重要な情報"
        }
      }
    ],
    "icon": {
      "type": "emoji",
      "emoji": "📝"
    }
  }
}
```

## 3. 注意事項

### 色について

テキストやブロックには`color`プロパティで色を指定できます。

```typescript
{
  "color": "default" //他にも "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background" が指定可能
}
```

1. **ブロック追加の制限**
   - 1回のAPI呼び出しで追加できるブロック数に制限があるため、長い記事は複数回に分けて追加

2. **リッチテキストの制限**
   - 1つのrich_textブロックの最大文字数に制限があるため、長文は複数のブロックに分割

3. **エラー処理**
   - 各API呼び出し後にレスポンスを確認
   - エラー時は親ブロックIDとコンテンツを保持して再試行

## 4. その他のブロック

### 見出し3

```typescript
{
  "object": "block",
  "type": "heading_3",
  "heading_3": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "見出し3のテキスト"
        }
      }
    ],
    "is_toggleable": false, // trueにすると開閉可能になる
    "color": "default" // 色を指定
  }
}
```

### 引用

```typescript
{
  "object": "block",
  "type": "quote",
  "quote": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "引用文"
        }
      }
    ],
    "color": "default" // 色を指定
  }
}
```

### テーブル

```typescript
{
  "object": "block",
  "type": "table",
  "table": {
    "table_width": 3, // 列数
    "has_column_header": true, // ヘッダー行の有無
    "has_row_header": true, // ヘッダー列の有無
    "children": [
      // ここにtable_rowブロックを追加
    ]
  }
}
```
`table`ブロックの中には`table_row`ブロックを入れ子にする必要があります。

### 開閉トグル

```typescript
{
  "object": "block",
  "type": "toggle",
  "toggle": {
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "トグルのラベル"
        }
      }
    ],
    "color": "default", // 色を指定
    "children": [
      // 開いた時に表示されるブロック
    ]
  }
}
```

### コード

```typescript
{
  "object": "block",
  "type": "code",
  "code": {
    "caption": [],
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "ここにコードを記述"
        }
      }
    ],
    "language": "javascript" // 言語を指定
  }
}
```
Mermaid記法を使う場合は、`language`を`mermaid`にします。

```typescript
{
  "object": "block",
  "type": "code",
  "code": {
    "caption": [],
    "rich_text": [
      {
        "type": "text",
        "text": {
          "content": "graph LR\\n  A-->B"
        }
      }
    ],
    "language": "mermaid"
  }
}
```

### 動画

```typescript
{
  "object": "block",
  "type": "video",
  "video": {
    "caption": [],
    "type": "external",
    "external": {
      "url": "https://www.youtube.com/watch?v=XXXXXXXXXXX" // YouTubeなどのURL
    }
  }
}
```

### 画像

```typescript
{
  "object": "block",
  "type": "image",
  "image": {
    "caption": [
      {
        "type": "text",
        "text": {
          "content": "キャプション"
        }
      }
    ],
    "type": "external", // 外部リンクの場合
    "external": {
      "url": "https://example.com/image.jpg"
    }
  }
}
```

### ブックマーク

```typescript
{
  "object": "block",
  "type": "bookmark",
  "bookmark": {
    "caption": [],
    "url": "https://example.com"
  }
}
```

### ページ内リンク

```typescript
{
  "object": "block",
  "type": "link_to_page",
  "link_to_page": {
    "type": "page_id",
    "page_id": "ページID"
  }
}
```

## 5. プロパティの制約

データベースアイテム作成時に必須のプロパティ：

-   Page（title）: 記事のタイトル
-   Category（select）: カテゴリの選択
-   Tags（multi_select）: 複数のタグ
-   Date（date）: 公開日
-   Excerpt（rich_text）: 記事の要約

## 6. 実装フロー

1.  データベースアイテムの作成
2.  返却されたページIDの保存
3.  メインコンテンツの構造化
4.  ブロック単位でのコンテンツ追加
5.  エラー時の再試行処理

## 7. エラー発生時の対応

1.  データベースアイテム作成失敗
    -   プロパティの型を確認
    -   必須フィールドの確認
    -   選択肢の値が有効か確認
2.  ブロック追加失敗
    -   ページIDの有効性確認
    -   コンテンツ量の確認
    -   必要に応じて分割して追加

### 具体的な実践アクションと詳細なNotion API利用手順

1. **記事データベースの構築**
   - Notionの「データベースアイテム作成」APIを利用し、必須プロパティ（タイトル、カテゴリ、タグ、公開日、要約）を確実に設定する。
   - 具体的には、ターゲット読者のニーズに基づき、各プロパティに適切なデータを入力するテンプレートを作成する。
   - ※参考: GoogleのSearch Quality Evaluator Guidelines（https://static.googleusercontent.com/media/guidelines.raterhub.com/ja//searchqualityevaluatorguidelines.pdf）

2. **コンテンツブロックの段階的追加**
   - `notion_append_block_children` APIを使い、記事の構造（ヘッダー、導入、本文、セクション見出し、まとめ、CTA）を段階ごとに追加する。
   - 各ブロックは、適切なブロックタイプ（番号付きリスト、箇条書き、コールアウト、コード、画像等）を使用し、読みやすさと視覚的効果を向上させる。

3. **具体的テンプレートの適用**
   - タイトルは30～65文字で、キャッチーかつターゲットの関心を引く表現を採用。
   - 導入部では、読者の共感を呼び、記事を読むメリット（何が学べるか）を明確に提示する。
   - 本文は、実例、統計データ、引用、具体的なアクションプランを盛り込み、段階的に情報を整理する。
   - まとめ部分で、記事の主要ポイントを復習し、次の具体的なアクション（CTA）を促す。

4. **レビューとフィードバックのプロセス**
   - 記事完成後は内部レビューやテスト読者によるフィードバックを必ず実施。
   - フィードバックを基に、誤字脱字の修正、内容の追加や削除、SEO改善のための最適化を行う。

5. **定期的なアップデートの仕組み**
   - 最新の業界動向やユーザーフィードバック、法改正等を考慮し、記事を定期的に見直して更新する仕組みを確立。
   - スケジュール管理ツール（例: Googleカレンダー、Trello）を使用し、更新計画を自動化する。

この詳細な手順により、Notionを活用した記事作成プロセスが体系化され、究極の品質の記事作成が実現できます。

### 100点満点のNotion記事作成実践ガイド

#### 1. データベース構築の完全マニュアル
- **必須プロパティの設定**
  ```typescript
  {
    "Page": "記事タイトル（30-65文字）",
    "Category": "退職支援",
    "Tags": ["看護師", "退職方法", "体験談"],
    "Date": "2025-02-XX",
    "Excerpt": "記事の核心を100文字で要約"
  }
  ```

- **記事構造テンプレート**
  ```typescript
  [
    {type: "heading_1", content: "タイトル"},
    {type: "paragraph", content: "導入文"},
    {type: "heading_2", content: "目次"},
    {type: "heading_2", content: "本文セクション1"},
    {type: "paragraph", content: "具体的な内容"},
    {type: "callout", content: "重要ポイント"},
    {type: "heading_2", content: "まとめ"}
  ]
  ```

#### 2. コンテンツブロックの最適化
- **導入部の構成**
  ```typescript
  {
    "blocks": [
      {
        "type": "paragraph",
        "content": "読者への共感メッセージ"
      },
      {
        "type": "callout",
        "content": "記事のポイント",
        "icon": "📝"
      },
      {
        "type": "bulleted_list",
        "items": ["具体的な解決策1", "具体的な解決策2"]
      }
    ]
  }
  ```

- **本文セクションの構成**
  ```typescript
  {
    "blocks": [
      {
        "type": "heading_2",
        "content": "セクションタイトル"
      },
      {
        "type": "paragraph",
        "content": "概要説明"
      },
      {
        "type": "numbered_list",
        "items": ["手順1", "手順2", "手順3"]
      },
      {
        "type": "toggle",
        "summary": "よくある質問",
        "details": "詳細な回答"
      }
    ]
  }
  ```

#### 3. 視覚的要素の効果的活用
- **重要ポイントの強調**
  ```typescript
  {
    "type": "callout",
    "callout": {
      "rich_text": [{
        "text": {
          "content": "ここがポイント！"
        }
      }],
      "icon": "💡",
      "color": "yellow_background"
    }
  }
  ```

- **チェックリストの実装**
  ```typescript
  {
    "type": "to_do",
    "to_do": {
      "rich_text": [{
        "text": {
          "content": "実践ステップ"
        }
      }],
      "checked": false
    }
  }
  ```

#### 4. 品質管理プロセス
- **執筆前チェック**
  ```typescript
  const preWritingChecks = [
    "タイトルの最適化",
    "キーワードの配置計画",
    "構成の確認",
    "参考資料の準備"
  ];
  ```

- **執筆後チェック**
  ```typescript
  const postWritingChecks = [
    "文章の統一性",
    "情報の正確性",
    "リンクの有効性",
    "視覚的要素の適切性"
  ];
  ```

#### 5. 更新・メンテナンス体制
- **定期更新の自動化**
  ```typescript
  const updateSchedule = {
    "frequency": "monthly",
    "checkPoints": [
      "最新情報の反映",
      "リンク切れの確認",
      "コメント対応の確認",
      "アクセス分析の反映"
    ]
  };
  ```

この100点満点のガイドに従うことで、Notionを活用した効率的かつ高品質な記事作成が実現できます。

<!-- 記事の基本構造や詳細な執筆手順は blog-writting-rules.md をご参照ください。 -->
