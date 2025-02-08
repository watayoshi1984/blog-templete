const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// フォントの定義
const FONTS = {
  'ZenMaruGothic': {
    url: 'https://github.com/googlefonts/zen-marugothic/raw/main/fonts/ttf/ZenMaruGothic-Regular.ttf',
    weights: {
      '400': 'Regular',
      '700': 'Bold'
    }
  },
  'ZenKakuGothicNew': {
    url: 'https://github.com/googlefonts/zen-kakugothic/raw/main/fonts/ttf/ZenKakuGothicNew-Regular.ttf',
    weights: {
      '400': 'Regular',
      '700': 'Bold'
    }
  },
  'LINESeedJP': {
    url: 'https://seed.line.me/src/fonts/WOFF2/LINESeedJP_OTF_Rg.woff2',
    weights: {
      '400': 'Regular',
      '700': 'Bold'
    }
  },
  'MPLUS1': {
    url: 'https://github.com/coz-m/MPLUS_FONTS/raw/master/fonts/ttf/Mplus1-Regular.ttf',
    weights: {
      '400': 'Regular',
      '700': 'Bold'
    }
  },
  'MPLUSRounded1c': {
    url: 'https://github.com/coz-m/MPLUS_FONTS/raw/master/fonts/ttf/MplusRounded1c-Regular.ttf',
    weights: {
      '400': 'Regular',
      '700': 'Bold'
    }
  },
  'NicomojiPlus': {
    url: 'https://github.com/googlefonts/nicomoji-plus/raw/main/fonts/ttf/NicomojiPlus-Regular.ttf',
    weights: {
      '400': 'Regular'
    }
  }
};

// 必要なディレクトリの作成
const FONTS_DIR = path.join(__dirname, '../public/fonts');
const SUBSETS_DIR = path.join(FONTS_DIR, 'subsets');
const TEMP_DIR = path.join(FONTS_DIR, 'temp');

[FONTS_DIR, SUBSETS_DIR, TEMP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// フォントのダウンロードとサブセット化
Object.entries(FONTS).forEach(([fontName, fontInfo]) => {
  Object.entries(fontInfo.weights).forEach(([weight, style]) => {
    const fileName = `${fontName}-${style}`;
    const tempPath = path.join(TEMP_DIR, `${fileName}.ttf`);
    const outputPath = path.join(SUBSETS_DIR, `${fileName}.woff2`);

    // フォントのダウンロード
    console.log(`Downloading ${fileName}...`);
    try {
      execSync(`curl -L "${fontInfo.url}" -o "${tempPath}"`);
    } catch (error) {
      console.error(`Error downloading ${fileName}:`, error);
      return;
    }

    // サブセット化とWOFF2変換
    console.log(`Converting ${fileName} to WOFF2 with subset...`);
    try {
      execSync(`pyftsubset "${tempPath}" --output-file="${outputPath}" --flavor=woff2 --layout-features='*' --unicodes='U+0000-00FF,U+2000-206F,U+2070-209F,U+20A0-20CF,U+2100-214F,U+2150-218F,U+2190-21FF,U+2200-22FF,U+2300-23FF,U+2400-243F,U+2440-245F,U+2460-24FF,U+2500-257F,U+2580-259F,U+25A0-25FF,U+2600-26FF,U+2700-27BF,U+27C0-27EF,U+27F0-27FF,U+2800-28FF,U+2900-297F,U+2980-29FF,U+2A00-2AFF,U+2B00-2BFF,U+2C00-2C5F,U+2C60-2C7F,U+2C80-2CFF,U+2D00-2D2F,U+2D30-2D7F,U+2D80-2DDF,U+2DE0-2DFF,U+2E00-2E7F,U+2E80-2EFF,U+2F00-2FDF,U+2FF0-2FFF,U+3000-303F,U+3040-309F,U+30A0-30FF,U+3100-312F,U+3130-318F,U+3190-319F,U+31A0-31BF,U+31C0-31EF,U+31F0-31FF,U+3200-32FF,U+3300-33FF,U+3400-4DBF,U+4DC0-4DFF,U+4E00-9FFF,U+A000-A48F,U+A490-A4CF,U+A4D0-A4FF,U+A500-A63F,U+A640-A69F,U+A6A0-A6FF,U+A700-A71F,U+A720-A7FF,U+A800-A82F,U+A830-A83F,U+A840-A87F,U+A880-A8DF,U+A8E0-A8FF,U+A900-A92F,U+A930-A95F,U+A960-A97F,U+A980-A9DF,U+A9E0-A9FF,U+AA00-AA5F,U+AA60-AA7F,U+AA80-AADF,U+AAE0-AAFF,U+AB00-AB2F,U+AB30-AB6F,U+AB70-ABBF,U+ABC0-ABFF,U+AC00-D7AF,U+D7B0-D7FF,U+D800-DB7F,U+DB80-DBFF,U+DC00-DFFF,U+E000-F8FF,U+F900-FAFF,U+FB00-FB4F,U+FB50-FDFF,U+FE00-FE0F,U+FE10-FE1F,U+FE20-FE2F,U+FE30-FE4F,U+FE50-FE6F,U+FE70-FEFF,U+FF00-FFEF,U+FFF0-FFFF'`);
    } catch (error) {
      console.error(`Error converting ${fileName}:`, error);
      return;
    }

    // 一時ファイルの削除
    fs.unlinkSync(tempPath);
    console.log(`Successfully processed ${fileName}`);
  });
});

// 一時ディレクトリの削除
fs.rmdirSync(TEMP_DIR, { recursive: true });
console.log('Font processing completed!'); 