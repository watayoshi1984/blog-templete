import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DiagramType } from "@/lib/types";

interface DiagramToggleProps {
  value: DiagramType;
  onChange: (value: DiagramType) => void;
}

export function DiagramToggle({ value, onChange }: DiagramToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="diagram-type"
        checked={value === 'plantuml'}
        onCheckedChange={(checked) => onChange(checked ? 'plantuml' : 'mermaid')}
      />
      <Label htmlFor="diagram-type">
        {value === 'mermaid' ? 'Mermaid' : 'PlantUML'}
      </Label>
    </div>
  );
} 