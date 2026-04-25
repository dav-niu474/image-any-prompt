"use client";

import { useState } from "react";
import { Prompt, Scenario, CATEGORY_COLORS, CATEGORY_DOT_COLORS, SOURCE_LABELS, SOURCE_COLORS, SCENARIO_COLORS, SCENARIO_ICONS, truncateText } from "@/lib/prompt-data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PromptCardProps {
  prompt: Prompt;
  scenarios: Scenario[];
  onClick: () => void;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  photography: "from-emerald-500/10 to-teal-500/5",
  portrait: "from-violet-500/10 to-purple-500/5",
  poster: "from-rose-500/10 to-pink-500/5",
  ui: "from-cyan-500/10 to-blue-500/5",
  character: "from-amber-500/10 to-orange-500/5",
  gaming: "from-orange-500/10 to-red-500/5",
  food: "from-yellow-500/10 to-amber-500/5",
  "3d": "from-teal-500/10 to-cyan-500/5",
  fashion: "from-pink-500/10 to-rose-500/5",
  logo: "from-indigo-500/10 to-violet-500/5",
  infographic: "from-blue-500/10 to-cyan-500/5",
  "paper-craft": "from-lime-500/10 to-green-500/5",
  landscape: "from-green-500/10 to-emerald-500/5",
  minimalist: "from-slate-500/10 to-gray-500/5",
  futuristic: "from-fuchsia-500/10 to-purple-500/5",
  comparison: "from-red-500/10 to-rose-500/5",
  video: "from-purple-500/10 to-violet-500/5",
  editing: "from-sky-500/10 to-blue-500/5",
  interior: "from-amber-500/10 to-yellow-500/5",
};

const LOCAL_CATEGORY_ICONS: Record<string, string> = {
  photography: "📷",
  portrait: "👤",
  poster: "📰",
  ui: "📱",
  character: "🎭",
  gaming: "🎮",
  food: "🍜",
  "3d": "🧊",
  fashion: "👗",
  logo: "🎯",
  infographic: "📊",
  "paper-craft": "✂️",
  landscape: "🏔️",
  minimalist: "◽",
  futuristic: "🚀",
  comparison: "⚡",
  video: "🎬",
  editing: "🖼️",
  interior: "🏠",
};

export function PromptCard({ prompt, scenarios, onClick }: PromptCardProps) {
  const [imgError, setImgError] = useState(false);
  const sourceColor = SOURCE_COLORS[prompt.source] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  const sourceLabel = SOURCE_LABELS[prompt.source] || prompt.source;
  const gradient = CATEGORY_GRADIENTS[prompt.category] || "from-slate-500/10 to-slate-500/5";
  const categoryColor = CATEGORY_COLORS[prompt.category] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  const categoryIcon = LOCAL_CATEGORY_ICONS[prompt.category] || "🎨";
  const scenarioColor = SCENARIO_COLORS[prompt.scenario] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  const scenarioIcon = SCENARIO_ICONS[prompt.scenario] || "🎨";
  const scenarioLabel = scenarios.find(s => s.id === prompt.scenario)?.label || prompt.scenario;
  const hasImage = prompt.imageUrl && !imgError;

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-slate-800/50 border border-slate-700/40 rounded-xl overflow-hidden hover:border-emerald-500/30 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Category gradient header */}
      <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

      {/* Image preview */}
      {hasImage && (
        <div className="relative w-full aspect-[4/3] bg-slate-900/80 overflow-hidden">
          <Image
            src={prompt.imageUrl}
            alt={prompt.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          {/* Source badge on image */}
          <div className="absolute top-2 right-2">
            <Badge
              variant="outline"
              className={`text-[10px] px-1.5 py-0.5 bg-slate-900/60 backdrop-blur-sm ${sourceColor}`}
            >
              {sourceLabel}
            </Badge>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Category icon and title */}
        <div className="flex items-start gap-2.5 mb-2">
          <span className="text-base shrink-0 mt-0.5">{categoryIcon}</span>
          <h3 className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            {prompt.title}
          </h3>
        </div>

        {/* Prompt preview */}
        <p className="text-xs text-slate-400 line-clamp-3 mb-3 pl-7 leading-relaxed">
          {truncateText(prompt.prompt, 120)}
        </p>

        {/* Tags and scenario */}
        <div className="flex flex-wrap gap-1.5 pl-7">
          <Badge
            variant="outline"
            className={`text-[10px] px-1.5 py-0 ${scenarioColor}`}
          >
            {scenarioIcon} {scenarioLabel}
          </Badge>
          <Badge
            variant="outline"
            className={`text-[10px] px-1.5 py-0 ${categoryColor}`}
          >
            {prompt.category}
          </Badge>
          {prompt.tags.filter(t => t !== prompt.category).slice(0, 1).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-[10px] px-1.5 py-0 bg-slate-700/50 text-slate-400 border-slate-600/50"
            >
              {tag}
            </Badge>
          ))}
          {/* Show source badge at bottom if no image */}
          {!hasImage && (
            <Badge
              variant="outline"
              className={`text-[10px] px-1.5 py-0 ml-auto ${sourceColor}`}
            >
              {sourceLabel}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
