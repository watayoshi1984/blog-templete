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
export const SITE_TITLE = import.meta.env.VITE_SITE_TITLE || 'NEXT Nurse｜3回転職を経験した看護師による仕事で悩む若手看護師に捧げるキャリアブログ'
export const SITE_DESCRIPTION = import.meta.env.VITE_SITE_DESCRIPTION || '看護師として3回の転職経験を持つ現役ナースが運営する、若手看護師向けキャリアブログ。仕事の悩みやキャリアプランニングについて実践的なアドバイスを提供します。'

// Author Information
export const SITE_AUTHOR = import.meta.env.VITE_AUTHOR_NAME || 'カンナ'
export const SITE_AUTHOR_DESCRIPTION = import.meta.env.VITE_AUTHOR_DESCRIPTION || '看護師として10年間、様々な医療現場で勤務。3回の転職を経験し、それぞれの経験から多くを学びました。現在は総合病院で勤務しながら、若手看護師のキャリア支援に携わっています。'
export const SITE_AUTHOR_IMAGE = import.meta.env.VITE_AUTHOR_IMAGE || '/auther.png'
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
export const SEO_KEYWORDS = import.meta.env.VITE_SEO_KEYWORDS || '看護師, キャリア, 転職, 医療, 病院, メンタルヘルス, 新人看護師, キャリアプラン, ワークライフバランス'
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
