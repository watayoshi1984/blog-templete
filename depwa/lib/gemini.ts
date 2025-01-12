import { GoogleGenerativeAI } from "@google/generative-ai";
import { DiagramType } from "./types";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const MERMAID_PROMPT = `
あなたは図の生成エキスパートです。以下の要件に従って、最適な図を生成してください：

1. 基本要件：
   - 必ずMermaid構文に準拠した図を生成すること
   - 日本語のみを使用すること（英語や他の言語は使用しない）
   - 改行とインデントを適切に使用すること
   - 各ノードやエッジには必ず一意のIDを付与すること

2. 図の種類：
   - フローチャート（graph TD/LR）
   - シーケンス図（sequenceDiagram）
   - クラス図（classDiagram）
   - 状態遷移図（stateDiagram-v2）
   - ER図（erDiagram）
   - ガントチャート（gantt）
   - 円グラフ（pie）
   から、説明に最適な種類を選択すること

3. スタイル指定：
   - サブグラフは必要な場合のみ使用すること
   - 矢印のスタイルは -->、---、==>、--o などを適切に使用すること
   - ノードの形状は適切に選択すること（四角、丸、菱形など）
   - 色は必要な場合のみ使用すること

4. 出力形式：
   必ず以下の形式で出力すること：
   \`\`\`mermaid
   [生成された図のコード]
   \`\`\`

5. エラー防止：
   - 特殊文字は避けること
   - 長い文字列は改行して表示すること
   - IDには半角英数字のみを使用すること
   - コメントは %% で開始すること

入力された説明に基づいて、上記の要件を満たす図を生成してください。
`;

const PLANTUML_PROMPT = `
あなたはPlantUMLの図を生成する専門家です。
以下の要件に従って、PlantUMLの図を生成してください：

1. 与えられた説明に基づいて、最適な図を生成してください
2. 生成する図は、必ずPlantUMLの構文に従ってください
3. 図の種類（クラス図、シーケンス図など）は、説明に最適なものを選んでください
4. 日本語でコメントを含めてください
5. 図は見やすく、理解しやすいものにしてください
6. 必要に応じて、スタイリングを適用してください

生成する図のコードのみを返してください。説明は不要です。
`;

export async function generateDiagram(prompt: string, type: DiagramType): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const systemPrompt = type === 'mermaid' ? MERMAID_PROMPT : PLANTUML_PROMPT;
    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    const text = response.text();
    return text.trim();
  } catch (error) {
    console.error('Error generating diagram:', error);
    throw error;
  }
}

export async function modifyDiagram(currentCode: string, prompt: string, notationType: 'mermaid' | 'plantuml'): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(`
    Modify the following ${notationType} diagram based on this instruction:
    ${prompt}

    Current diagram code:
    ${currentCode}

    Only return the modified ${notationType} code, without any additional text or explanations.
  `);

  const response = result.response;
  const text = response.text();
  return text.trim();
}

