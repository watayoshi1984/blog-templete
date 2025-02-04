import type { Author } from './interfaces'
import { SITE_AUTHOR, SITE_AUTHOR_DESCRIPTION, SITE_AUTHOR_IMAGE, SITE_AUTHOR_SOCIAL } from '../server-constants'

/**
 * Notionデータベースに以下のプロパティを追加してください：
 * 
 * 1. Author (Select)
 *    - オプション: 'カフカ'
 *    - 記事の著者名を選択するために使用
 * 
 * 2. AuthorImage (Files)
 *    - 著者のプロフィール画像をアップロード
 *    - 画像が設定されていない場合は下記のデフォルト画像が使用されます
 * 
 * 3. AuthorDescription (Rich text)
 *    - 著者の説明文を入力
 *    - 設定されていない場合は下記のデフォルトの説明文が使用されます
 * 
 * 4. AuthorTwitter (URL)
 *    - 著者のTwitterプロフィールURL
 *    - 例: https://twitter.com/kafka
 * 
 * 5. AuthorGithub (URL)
 *    - 著者のGitHubプロフィールURL
 *    - 例: https://github.com/kafka
 * 
 * 6. AuthorLinkedin (URL)
 *    - 著者のLinkedInプロフィールURL
 *    - 例: https://www.linkedin.com/in/kafka
 */

// デフォルトの著者情報
export const defaultAuthor: Author = {
  name: SITE_AUTHOR,
  profileImage: SITE_AUTHOR_IMAGE,
  description: SITE_AUTHOR_DESCRIPTION,
  socialLinks: SITE_AUTHOR_SOCIAL,
}

// 著者情報のマッピング
export const authors: Record<string, Author> = {
  [SITE_AUTHOR]: defaultAuthor,
  // 他の著者を追加する場合は以下のようにマッピングを追加してください
  /*
  'デザイナー': {
    name: 'デザイナー',
    profileImage: '/authors/designer.jpg',
    description: 'UIデザインとユーザー体験の向上に取り組むデザイナーです。',
    socialLinks: {
      twitter: 'https://twitter.com/designer',
      github: 'https://github.com/designer',
      linkedin: 'https://www.linkedin.com/in/designer',
    },
  },
  */
} 