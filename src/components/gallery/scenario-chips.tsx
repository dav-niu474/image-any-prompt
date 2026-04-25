"use client";

import { Scenario, SCENARIO_COLORS } from "@/lib/prompt-data";
import { Badge } from "@/components/ui/badge";

interface ScenarioChipsProps {
  scenarios: Scenario[];
  selected: string[];
  onToggle: (scenarioId: string) => void;
  onClear: () => void;
}

export function ScenarioChips({
  scenarios,
  selected,
  onToggle,
  onClear,
}: ScenarioChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {scenarios.map((scenario) => {
        const isSelected = selected.includes(scenario.id);
        const colorClasses =
          SCENARIO_COLORS[scenario.id] || "bg-slate-500/20 text-slate-400 border-slate-500/30";

        return (
          <button
            key={scenario.id}
            onClick={() => onToggle(scenario.id)}
            className="transition-all duration-200"
          >
            <Badge
              variant="outline"
              className={`cursor-pointer transition-all duration-200 text-xs px-2.5 py-1 ${
                isSelected
                  ? colorClasses + " ring-1 ring-current/30 shadow-sm"
                  : "bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300"
              }`}
            >
              {scenario.label}
            </Badge>
          </button>
        );
      })}
      {selected.length > 0 && (
        <button
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors ml-1"
        >
          清除场景筛选
        </button>
      )}
    </div>
  );
}
