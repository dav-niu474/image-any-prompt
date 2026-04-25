"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Pencil, RotateCcw } from "lucide-react";

interface PromptResultProps {
  prompt: string;
  onRegenerate: () => void;
}

export function PromptResult({ prompt, onRegenerate }: PromptResultProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);

  const handleCopy = async () => {
    const textToCopy = isEditing ? editedPrompt : prompt;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setEditedPrompt(prompt);
      setIsEditing(true);
    }
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-emerald-400">✨ 生成结果</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEditToggle}
            className="h-7 px-2 text-xs text-slate-400 hover:text-slate-200"
          >
            <Pencil className="size-3 mr-1" />
            {isEditing ? "完成" : "编辑"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onRegenerate}
            className="h-7 px-2 text-xs text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="size-3 mr-1" />
            重新生成
          </Button>
          <Button
            size="sm"
            onClick={handleCopy}
            className="h-7 px-3 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {copied ? (
              <>
                <Check className="size-3" /> 已复制
              </>
            ) : (
              <>
                <Copy className="size-3" /> 复制
              </>
            )}
          </Button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          value={editedPrompt}
          onChange={(e) => setEditedPrompt(e.target.value)}
          className="w-full min-h-32 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
        />
      ) : (
        <div className="bg-slate-900/40 rounded-lg p-3">
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {prompt}
          </p>
        </div>
      )}
    </div>
  );
}
