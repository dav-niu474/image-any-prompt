"use client";

import { useState } from "react";
import {
  Prompt,
  Category,
  CATEGORY_COLORS,
  CATEGORY_DOT_COLORS,
  CATEGORY_ICONS,
  SOURCE_LABELS,
  SOURCE_COLORS,
  truncateText,
} from "@/lib/prompt-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Check, ChevronRight, ExternalLink } from "lucide-react";

interface PromptDetailDialogProps {
  prompt: Prompt | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  allPrompts: Prompt[];
  onNavigate: (prompt: Prompt) => void;
}

export function PromptDetailDialog({
  prompt,
  open,
  onOpenChange,
  categories,
  allPrompts,
  onNavigate,
}: PromptDetailDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const categoryColor =
    CATEGORY_COLORS[prompt.category] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  const dotColor = CATEGORY_DOT_COLORS[prompt.category] || "bg-slate-400";
  const sourceColor = SOURCE_COLORS[prompt.source] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  const sourceLabel = SOURCE_LABELS[prompt.source] || prompt.source;
  const categoryLabel =
    categories.find((c) => c.id === prompt.category)?.label || prompt.category;
  const categoryIcon = CATEGORY_ICONS[prompt.category] || "🎨";

  const relatedPrompts = allPrompts
    .filter((p) => p.category === prompt.category && p.id !== prompt.id)
    .slice(0, 5);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt.prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700/60 text-slate-200 max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">{categoryIcon}</span>
            <Badge variant="outline" className={`text-xs ${categoryColor}`}>
              {categoryLabel}
            </Badge>
            <Badge variant="outline" className={`text-xs ${sourceColor}`}>
              {sourceLabel}
            </Badge>
          </div>
          <DialogTitle className="text-lg text-slate-100 leading-snug">
            {prompt.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Prompt details for {prompt.title}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-5 pb-4">
            {/* Prompt text */}
            <div className="relative">
              <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Prompt</span>
                  <span className="text-xs text-slate-600">{prompt.prompt.length} 字符</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                  {prompt.prompt}
                </p>
              </div>
              <Button
                size="sm"
                onClick={handleCopy}
                className="absolute top-3 right-3 bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3 text-xs gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                {copied ? (
                  <>
                    <Check className="size-3" /> 已复制
                  </>
                ) : (
                  <>
                    <Copy className="size-3" /> 复制提示词
                  </>
                )}
              </Button>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">标签</span>
              <div className="flex flex-wrap gap-1.5">
                {prompt.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs bg-slate-800/50 text-slate-400 border-slate-700/50"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Source info */}
            <div className="flex items-center gap-2 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <div className={`w-2 h-2 rounded-full ${dotColor}`} />
              <span className="text-xs text-slate-400">
                来源：<span className="text-slate-300">{sourceLabel}</span>
              </span>
              <span className="text-slate-700">·</span>
              <span className="text-xs text-slate-400">
                ID：<span className="text-slate-500 font-mono">{prompt.id}</span>
              </span>
            </div>

            {/* Related prompts */}
            {relatedPrompts.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  同类提示词
                </span>
                <div className="space-y-1.5">
                  {relatedPrompts.map((rp) => (
                    <button
                      key={rp.id}
                      onClick={() => onNavigate(rp)}
                      className="w-full flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/30 hover:border-emerald-500/20 transition-all text-left group"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-slate-300 truncate block group-hover:text-emerald-400 transition-colors">
                          {rp.title}
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1">
                          {truncateText(rp.prompt, 80)}
                        </span>
                      </div>
                      <ChevronRight className="size-3 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
