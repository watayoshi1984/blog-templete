import { GoogleGenerativeAI } from "@google/generative-ai";
import { DiagramType, GeminiResponse, PromptTemplate } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(API_KEY);

const promptTemplates: PromptTemplate = {
  mermaid: `
以下の要件に基づいて、Mermaid記法のダイアグラムを生成してください：
1. 与えられた説明から適切なダイアグラム形式を選択する
2. コードのみを出力し、説明は含めない
3. 日本語でラベルを付ける
4. シンプルで分かりやすい構造にする
5. 必要に応じて適切なスタイリングを適用する

要件：
`,
  plantuml: `
以下の要件に基づいて、PlantUML記法のダイアグラムを生成してください：
1. 与えられた説明から適切なダイアグラム形式を選択する
2. コードのみを出力し、説明は含めない
3. 日本語でラベルを付ける
4. シンプルで分かりやすい構造にする
5. スキンパラメータを適用して見やすくする

要件：
`
};

export async function generateDiagram(prompt: string, type: DiagramType): Promise<GeminiResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const fullPrompt = `${promptTemplates[type]}${prompt}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    return { text };
  } catch (error) {
    console.error('Error generating diagram:', error);
    return {
      text: '',
      error: error instanceof Error ? error.message : '不明なエラーが発生しました'
    };
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

