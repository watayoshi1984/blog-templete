import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// ESモジュールで__dirnameを再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// リストファイルのパスを修正（プロジェクトルートのファイルを参照）
const LIST_FILE = path.join(__dirname, '..', 'td-post-list.md');

// 保存先ディレクトリ
const SAVE_DIR = __dirname;

async function fetchAndSaveArticle(url: string) {
    try {
        console.log(`Fetching content from: ${url}`);
        const jinaUrl = `https://r.jina.ai/${url}`;
        const response = await fetch(jinaUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const content = await response.text();
        
        // 空のコンテンツをチェック
        if (!content.trim()) {
            throw new Error('Received empty content');
        }
        
        // URLからスラッグを抽出
        const slug = url.split('/').filter(Boolean).pop() || 'article';
        
        // タイムスタンプを YYYY-MM-DD-HH-mm 形式で生成
        const now = new Date();
        const timestamp = now.toISOString()
            .replace(/T/, '-')
            .replace(/\..+/, '')
            .replace(/:/g, '-')
            .slice(0, 16);
        
        const filename = `${timestamp}-${slug}.md`;
        const filepath = path.join(SAVE_DIR, filename);
        
        // ファイル保存前にログ出力
        console.log(`Saving content to: ${filepath}`);
        console.log(`Content length: ${content.length} characters`);
        
        // ディレクトリの存在確認
        if (!fs.existsSync(SAVE_DIR)) {
            fs.mkdirSync(SAVE_DIR, { recursive: true });
        }
        
        // ファイル保存
        fs.writeFileSync(filepath, content, 'utf-8');
        
        // ファイルが正しく保存されたか確認
        if (fs.existsSync(filepath)) {
            const savedContent = fs.readFileSync(filepath, 'utf-8');
            if (savedContent.length > 0) {
                console.log(`Successfully saved file: ${filename}`);
                return true;
            }
        }
        
        throw new Error('File save verification failed');
    } catch (error) {
        console.error(`Error processing ${url}:`, error);
        return false;
    }
}

async function markAsCompleted(url: string) {
    try {
        const content = fs.readFileSync(LIST_FILE, 'utf-8');
        // 改行コードを統一して処理
        const lines = content.split(/\r?\n/);
        const updatedLines = lines.map(line => {
            if (line.includes(url)) {
                return line.replace('- [ ]', '- [x]');
            }
            return line;
        });
        
        // 改行コードを保持して書き戻し
        fs.writeFileSync(LIST_FILE, updatedLines.join('\n'), 'utf-8');
        
        // 確認のためのログ
        console.log(`Marked as completed in list: ${url}`);
    } catch (error) {
        console.error('Error marking as completed:', error);
    }
}

async function getUnprocessedUrls(): Promise<string[]> {
    try {
        const content = fs.readFileSync(LIST_FILE, 'utf-8');
        // 改行コードを統一して処理
        const lines = content.split(/\r?\n/);
        const urls = lines
            .filter(line => line.trim().startsWith('- [ ]'))
            .map(line => {
                const match = line.match(/- \[ \] (.*)/);
                return match ? match[1].trim() : '';
            })
            .filter(url => url !== '');
        
        // 確認のためのログ
        console.log(`Found ${urls.length} unprocessed URLs`);
        return urls;
    } catch (error) {
        console.error('Error getting unprocessed URLs:', error);
        return [];
    }
}

async function processAllArticles() {
    while (true) {
        const urls = await getUnprocessedUrls();
        if (urls.length === 0) {
            console.log('All articles processed!');
            break;
        }

        for (const url of urls) {
            console.log(`Processing: ${url}`);
            const success = await fetchAndSaveArticle(url);
            
            if (success) {
                await markAsCompleted(url);
                console.log(`Completed: ${url}`);
            } else {
                console.log(`Failed: ${url}`);
            }

            // Wait 10 seconds before next request
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }
}

// Start processing
processAllArticles().catch(console.error); 