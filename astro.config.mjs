import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import { CUSTOM_DOMAIN, BASE_PATH } from './src/server-constants';
import CoverImageDownloader from './src/integrations/cover-image-downloader';
import CustomIconDownloader from './src/integrations/custom-icon-downloader';
import FeaturedImageDownloader from './src/integrations/featured-image-downloader';
import PublicNotionCopier from './src/integrations/public-notion-copier';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import compress from 'astro-compress';

const getSite = function () {
  if (CUSTOM_DOMAIN) {
    return new URL(BASE_PATH, `https://${CUSTOM_DOMAIN}`).toString();
  }

  if (process.env.VERCEL && process.env.VERCEL_URL) {
    return new URL(BASE_PATH, `https://${process.env.VERCEL_URL}`).toString();
  }

  if (process.env.CF_PAGES) {
    if (process.env.CF_PAGES_BRANCH !== 'main') {
      return new URL(BASE_PATH, process.env.CF_PAGES_URL).toString();
    }

    return new URL(
      BASE_PATH,
      `https://${new URL(process.env.CF_PAGES_URL).host
        .split('.')
        .slice(1)
        .join('.')}`
    ).toString();
  }

  return new URL(BASE_PATH, 'http://localhost:4321').toString();
};

// https://astro.build/config
export default defineConfig({
  site: getSite(),
  base: BASE_PATH,
  output: 'static',
  outDir: 'dist',
  trailingSlash: 'never',
  build: {
    format: 'file',
    assets: 'assets',
    inlineStylesheets: 'auto',
    optimizeDeps: {
      exclude: ['@notionhq/client']
    }
  },
  vite: {
    envDir: '.',
    envPrefix: ['NOTION_', 'DATABASE_', 'VITE_'],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'notion': ['@notionhq/client']
          }
        }
      },
      assetsInlineLimit: 4096,
      cssMinify: true,
      minify: true
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80,
      },
    },
  },
  compressHTML: true,
  integrations: [
    icon({
      include: {
        octicon: ['*'],
      },
    }),
    CoverImageDownloader(),
    CustomIconDownloader(),
    FeaturedImageDownloader(),
    PublicNotionCopier(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    react(),
    compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
      },
      Image: {
        input: [
          'dist/notion/**/*.{jpg,png,gif,jpeg}',
          'public/**/*.{jpg,png,gif,jpeg}',
        ],
        excludeFiles: [
          /.*astro-notion-blog.*/,
          /.*-1920\..*/,
          /.*-1600\..*/,
          /.*-1280\..*/,
          /.*&.*$/,
          /.*\?.*/,
          /.*-original\..*/,
          /.*\.processed\..*/,
          /.*\.min\..*/,
          /optimized\//,
        ],
        format: ['webp'],
        sizes: [320, 640, 960],
        quality: {
          webp: 80,
        },
        errorOnUnusedImage: false,
        logStats: true,
        sharp: {
          animated: false,
          failOnError: false,
          limitInputPixels: 50000000, // 50MP
          withMetadata: false,
        },
      },
      JavaScript: {
        compress: {
          passes: 2,
        },
      },
      SVG: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                convertPathData: false,
                mergePaths: false,
                cleanupIDs: false,
              },
            },
          },
        ],
      },
    })
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
