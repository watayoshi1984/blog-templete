import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

interface OptimizedImageResult {
  avif: {
    src: string;
    srcset: string;
  };
  webp: {
    src: string;
    srcset: string;
  };
  fallback: {
    src: string;
    srcset: string;
  };
}

// 生成する画像サイズ（幅）の定義
const SIZES = [320, 640, 960, 1280, 1600, 1920];

export async function optimizeImage(
  imagePath: string,
  outputDir: string = 'public/optimized'
): Promise<OptimizedImageResult> {
  // 出力ディレクトリが存在しない場合は作成
  await fs.mkdir(outputDir, { recursive: true });

  const filename = path.basename(imagePath, path.extname(imagePath));
  const outputBasePath = path.join(outputDir, filename);

  // 画像を読み込む
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  const originalWidth = metadata.width || 1920;

  // 各フォーマットとサイズの画像を生成
  const generateSizes = async (format: 'avif' | 'webp' | 'original') => {
    const paths: { width: number; path: string }[] = [];

    for (const width of SIZES.filter(w => w <= originalWidth)) {
      const resizedImage = image.clone().resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });

      const outputFilename = `${filename}-${width}`;
      let outputPath: string;

      switch (format) {
        case 'avif':
          outputPath = `${outputBasePath}-${width}.avif`;
          await resizedImage.avif({ quality: 80 }).toFile(outputPath);
          break;
        case 'webp':
          outputPath = `${outputBasePath}-${width}.webp`;
          await resizedImage.webp({ quality: 80 }).toFile(outputPath);
          break;
        case 'original':
          outputPath = `${outputBasePath}-${width}${path.extname(imagePath)}`;
          await resizedImage
            .jpeg({ quality: 80 })
            .png({ quality: 80 })
            .toFile(outputPath);
          break;
      }

      paths.push({
        width,
        path: `/optimized/${path.basename(outputPath)}`
      });
    }

    // オリジナルサイズのパスを追加（最大サイズより大きい場合）
    const maxSize = Math.max(...SIZES);
    if (originalWidth > maxSize) {
      let outputPath: string;
      switch (format) {
        case 'avif':
          outputPath = `${outputBasePath}-original.avif`;
          await image.clone().avif({ quality: 80 }).toFile(outputPath);
          break;
        case 'webp':
          outputPath = `${outputBasePath}-original.webp`;
          await image.clone().webp({ quality: 80 }).toFile(outputPath);
          break;
        case 'original':
          outputPath = `${outputBasePath}-original${path.extname(imagePath)}`;
          await image.clone()
            .jpeg({ quality: 80 })
            .png({ quality: 80 })
            .toFile(outputPath);
          break;
      }
      paths.push({
        width: originalWidth,
        path: `/optimized/${path.basename(outputPath)}`
      });
    }

    // srcsetを生成
    const srcset = paths
      .map(({ width, path }) => `${path} ${width}w`)
      .join(', ');

    return {
      src: paths[paths.length - 1].path, // 最大サイズをデフォルトとして使用
      srcset
    };
  };

  // 各フォーマットの画像を生成
  const [avif, webp, fallback] = await Promise.all([
    generateSizes('avif'),
    generateSizes('webp'),
    generateSizes('original')
  ]);

  return { avif, webp, fallback };
}

export function generatePictureTag(
  sources: OptimizedImageResult,
  alt: string,
  className: string = '',
  loading: 'lazy' | 'eager' = 'lazy',
  sizes: string = '(min-width: 1280px) 1280px, 100vw'
): string {
  return `
    <picture>
      <source
        srcset="${sources.avif.srcset}"
        sizes="${sizes}"
        type="image/avif"
      />
      <source
        srcset="${sources.webp.srcset}"
        sizes="${sizes}"
        type="image/webp"
      />
      <img
        src="${sources.fallback.src}"
        srcset="${sources.fallback.srcset}"
        sizes="${sizes}"
        alt="${alt}"
        class="${className}"
        loading="${loading}"
      />
    </picture>
  `;
} 