import { GoogleGenerativeAI } from "@google/generative-ai";
import { DiagramType } from "./types";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const MERMAID_PROMPT = `
あなたはMermaidの図を生成する専門家です。
以下の要件に従って、Mermaidの図を生成してください：

1. 与えられた説明に基づいて、最適な図を生成してください
2. 生成する図は、必ずMermaidの構文に従ってください
3. 図の種類（フローチャート、シーケンス図など）は、説明に最適なものを選んでください
4. 日本語でコメントを含めてください
5. 図は見やすく、理解しやすいものにしてください
6. 必要に応じて、スタイリングを適用してください

生成する図のコードのみを返してください。説明は不要です。
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

