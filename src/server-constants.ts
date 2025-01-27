export const NOTION_API_SECRET = import.meta.env.VITE_NOTION_API_SECRET || ''
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID || ''

export const CUSTOM_DOMAIN =
  import.meta.env.CUSTOM_DOMAIN || process.env.CUSTOM_DOMAIN || '' // <- Set your costom domain if you have. e.g. alpacat.com
export const BASE_PATH =
  import.meta.env.BASE_PATH || process.env.BASE_PATH || '' // <- Set sub directory path if you want. e.g. /docs/
export const SITE_URL = CUSTOM_DOMAIN ? `https://${CUSTOM_DOMAIN}${BASE_PATH}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}${BASE_PATH}` : `http://localhost:4321${BASE_PATH}`

export const PUBLIC_GA_TRACKING_ID = import.meta.env.PUBLIC_GA_TRACKING_ID
export const NUMBER_OF_POSTS_PER_PAGE = 10
export const REQUEST_TIMEOUT_MS = parseInt(
  import.meta.env.REQUEST_TIMEOUT_MS || '10000',
  10
)
export const ENABLE_LIGHTBOX = import.meta.env.ENABLE_LIGHTBOX

export const SITE_TITLE = 'エンジニアの戯言'
export const SITE_DESCRIPTION = 'エンジニアが生成AIとともに歩むAIXの道'
export const SITE_AUTHOR = 'カフカ'
export const SITE_AUTHOR_DESCRIPTION = 'AIとWeb技術を探求するエンジニア。10年以上のソフトウェア開発経験を持ち、特にAIとWebテクノロジーの統合に情熱を注いでいます。'
