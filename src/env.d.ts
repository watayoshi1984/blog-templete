/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_API_KEY: string;
  readonly NOTION_DATABASE_ID: string;
  readonly GEMINI_API_KEY: string;
  readonly GEMINI_MODEL: string;
  readonly GEMINI_TEXT_MODEL: string;
  readonly GEMINI_TEXT_ENDPOINT: string;
  readonly HUGGINGFACE_API_KEY: string;
  readonly HUGGINGFACE_ENDPOINT: string;
  readonly MAX_OUTPUT_TOKENS: string;
  readonly TEMPERATURE: string;
  readonly TOP_K: string;
  readonly TOP_P: string;
  readonly GIT_HUB: string;

  // フォント設定
  readonly FONT_FAMILY: 'Zen Maru Gothic' | 'Zen Kaku Gothic New' | 'LINE Seed JP' | 'M PLUS 1' | 'M PLUS Rounded 1c' | 'Nicomoji Plus';
  readonly FONT_WEIGHTS: string; // "400,700"
  readonly FONT_DISPLAY: 'swap' | 'block' | 'fallback' | 'optional' | 'auto';
  readonly FONT_SUBSET: string; // "latin,japanese"
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 