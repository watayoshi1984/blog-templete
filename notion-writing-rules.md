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
      "checkbox": ture // 公開設定
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

### 記事構造のテンプレート

1.  メインタイトル(h1)
    →タイトルルールに基づき30～65文字で作成
2.  導入文

    -   ユーザーへの呼びかけ（テキスト）
    -   この記事で分かること（コールアウト+リスト）
    -   記事を読み進めるCTA（テキスト）
3.  目次（目次ブロック）
4.  各セクション

    -   セクションタイトル（h2）
    -   セクションサマライズ(テキスト)
    -   子セクションのリスト(リスト+ジャンプリンク)
    -   滑り台効果を意識した次に読み進めるためのCTA（テキスト）
5.  子セクション

    -   セクションタイトル（h3）
    -   PREP法を意識した本文（テキスト）
6.  FAQコンテンツ

    -   開閉トグルにて作成
    -   ラベルにクエッション
    -   トグル内コンテンツにアンサー
7.  まとめ

    -   セクションタイトル（h2）
    -   記事のふりかえり（テキスト）
    -   記事の要約（コールアウト+リスト）
    -   記事ごとに適切なCTA（テキスト）

※各セクション内でユーザーが必要な情報は適宜、適切なノーションブロックを使用し、わかりやすく飽きさせないように装飾および情報の補完をすること

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
