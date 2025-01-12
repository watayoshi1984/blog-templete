'use client';

import { DiagramToggleProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function DiagramToggle({ value, onChange }: DiagramToggleProps) {
  return (
    <div className="diagram-toggle">
      <button
        onClick={() => onChange('mermaid')}
        className={cn(
          'diagram-toggle-button',
          value === 'mermaid' && 'active'
        )}
      >
        Mermaid
      </button>
      <button
        onClick={() => onChange('plantuml')}
        className={cn(
          'diagram-toggle-button',
          value === 'plantuml' && 'active'
        )}
      >
        PlantUML
      </button>
    </div>
  );
} 