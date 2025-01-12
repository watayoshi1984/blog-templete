export type DiagramType = 'mermaid' | 'plantuml';

export interface DiagramToggleProps {
  value: DiagramType;
  onChange: (type: DiagramType) => void;
} 