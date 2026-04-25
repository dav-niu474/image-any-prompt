"use client";

import { Category } from "@/lib/prompt-data";
import { CATEGORY_COLORS } from "@/lib/prompt-data";
import { Badge } from "@/components/ui/badge";

interface CategoryChipsProps {
  categories: Category[];
  selected: string[];
  onToggle: (categoryId: string) => void;
  onClear: () => void;
}

export function CategoryChips({
  categories,
  selected,
  onToggle,
  onClear,
}: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {categories.map((cat) => {
        const isSelected = selected.includes(cat.id);
        const colorClasses =
          CATEGORY_COLORS[cat.id] || "bg-slate-500/20 text-slate-400 border-slate-500/30";

        return (
          <button
            key={cat.id}
            onClick={() => onToggle(cat.id)}
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
              {cat.label}
            </Badge>
          </button>
        );
      })}
      {selected.length > 0 && (
        <button
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors ml-1"
        >
          清除筛选
        </button>
      )}
    </div>
  );
}
