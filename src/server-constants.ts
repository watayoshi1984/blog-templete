export const NOTION_API_SECRET = import.meta.env.VITE_NOTION_API_SECRET || ''
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID || ''
export const PAGES_DATABASE_ID = import.meta.env.VITE_PAGES_DATABASE_ID || ''

// Site Configuration
export const CUSTOM_DOMAIN = import.meta.env.VITE_SITE_URL || ''
export const BASE_PATH = import.meta.env.VITE_BASE_PATH || ''
export const SITE_URL = CUSTOM_DOMAIN || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}${BASE_PATH}` : `http://localhost:4321${BASE_PATH}`)

// Analytics Configuration
export const MATOMO_URL = import.meta.env.VITE_MATOMO_URL || ''
export const MATOMO_SITE_ID = import.meta.env.VITE_MATOMO_SITE_ID || ''

// Site Information
export const SITE_TITLE = import.meta.env.VITE_SITE_TITLE || 'エンジニアの戯言'
export const SITE_DESCRIPTION = import.meta.env.VITE_SITE_DESCRIPTION || 'エンジニアが生成AIとともに歩むAIXの道'

// Author Information
export const SITE_AUTHOR = import.meta.env.VITE_AUTHOR_NAME || 'カフカ'
export const SITE_AUTHOR_DESCRIPTION = import.meta.env.VITE_AUTHOR_DESCRIPTION || 'AIとWeb技術を探求するエンジニア'
export const SITE_AUTHOR_IMAGE = import.meta.env.VITE_AUTHOR_IMAGE || '/author.png'
export const SITE_AUTHOR_SOCIAL = {
  twitter: import.meta.env.VITE_AUTHOR_TWITTER || '',
  github: import.meta.env.VITE_AUTHOR_GITHUB || '',
  linkedin: import.meta.env.VITE_AUTHOR_LINKEDIN || '',
}

// SEO Configuration
export const ROBOTS_TXT = import.meta.env.VITE_ROBOTS_TXT || 'User-agent: *\nAllow: /'
export const HSTS_MAX_AGE = parseInt(import.meta.env.VITE_HSTS_MAX_AGE || '31536000', 10)
export const CSP_DIRECTIVES = import.meta.env.VITE_CSP_DIRECTIVES || ''

// Pagination
export const NUMBER_OF_POSTS_PER_PAGE = 10
export const REQUEST_TIMEOUT_MS = parseInt(import.meta.env.REQUEST_TIMEOUT_MS || '10000', 10)
export const ENABLE_LIGHTBOX = import.meta.env.ENABLE_LIGHTBOX

// SEO設定
export const SEO_KEYWORDS = import.meta.env.VITE_SEO_KEYWORDS || 'プログラミング, 技術ブログ, エンジニア, 開発, Web開発, フロントエンド, バックエンド'
export const SITE_LOGO = import.meta.env.VITE_SITE_LOGO || '/icon.jpg'
export const DEFAULT_OG_IMAGE = import.meta.env.VITE_DEFAULT_OG_IMAGE || '/default-og-image.png'

// 構造化マークアップの設定
export const STRUCTURED_DATA = {
  organization: {
    name: SITE_TITLE,
    url: SITE_URL,
    logo: SITE_LOGO,
    description: SITE_DESCRIPTION,
    sameAs: [
      SITE_AUTHOR_SOCIAL.twitter,
      SITE_AUTHOR_SOCIAL.github,
      SITE_AUTHOR_SOCIAL.linkedin,
    ].filter(Boolean),
  },
  website: {
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    searchAction: {
      target: `${SITE_URL}/search?q={search_term_string}`,
    },
  },
  breadcrumb: {
    homeLabel: import.meta.env.VITE_BREADCRUMB_HOME_LABEL || 'ホーム',
  },
}

// Contact Form Settings
export const TURNSTILE_SITE_KEY = import.meta.env.TURNSTILE_SITE_KEY || ''
export const TURNSTILE_SECRET_KEY = import.meta.env.TURNSTILE_SECRET_KEY || ''

// Email Settings
export const SENDGRID_API_KEY = import.meta.env.SENDGRID_API_KEY || ''
export const CONTACT_FORM_TO_EMAIL = import.meta.env.CONTACT_FORM_TO_EMAIL || ''
export const CONTACT_FORM_FROM_EMAIL = import.meta.env.CONTACT_FORM_FROM_EMAIL || ''
