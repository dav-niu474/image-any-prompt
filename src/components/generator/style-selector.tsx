"use client";

import { STYLES } from "@/lib/prompt-data";

interface StyleSelectorProps {
  selected: string;
  onSelect: (style: string) => void;
}

export function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {STYLES.map((style) => {
        const isSelected = selected === style.id;
        return (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/10"
                : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            <span className="text-xl">{style.label.split(" ")[0]}</span>
            <span className="text-[11px] font-medium leading-tight text-center">
              {style.label.split(" ").slice(1).join(" ")}
            </span>
          </button>
        );
      })}
    </div>
  );
}
