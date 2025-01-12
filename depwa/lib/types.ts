export type DiagramType = 'mermaid' | 'plantuml';

export interface PromptTemplate {
  mermaid: string;
  plantuml: string;
}

export interface DiagramState {
  type: DiagramType;
  code: string;
}

export interface GeminiResponse {
  text: string;
  error?: string;
} 