"use client";

import { useState, useMemo, useCallback } from "react";
import { Prompt, Category, CategoriesData, SOURCE_LABELS, filterPrompts } from "@/lib/prompt-data";
import { SearchBar } from "./search-bar";
import { CategoryChips } from "./category-chips";
import { PromptCard } from "./prompt-card";
import { PromptDetailDialog } from "./prompt-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryTabProps {
  prompts: Prompt[];
  categories: Category[];
}

const ALL_SOURCES = Object.keys(SOURCE_LABELS);

export function GalleryTab({ prompts, categories }: GalleryTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSourceFilter, setShowSourceFilter] = useState(false);
  const [compactView, setCompactView] = useState(false);

  const filteredPrompts = useMemo(
    () => filterPrompts(prompts, searchQuery, selectedCategories, selectedSources),
    [prompts, searchQuery, selectedCategories, selectedSources]
  );

  const handleToggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  const handleClearCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const handleToggleSource = useCallback((source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  }, []);

  const handleCardClick = useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setDialogOpen(true);
  }, []);

  const handleNavigate = useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt);
  }, []);

  return (
    <div className="space-y-4">
      {/* Search and controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="flex gap-2 items-center shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSourceFilter(!showSourceFilter)}
            className={`h-9 gap-1.5 text-xs ${
              selectedSources.length > 0
                ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                : "border-slate-700 text-slate-400 bg-slate-800/50 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            <Filter className="size-3.5" />
            来源 {selectedSources.length > 0 && `(${selectedSources.length})`}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCompactView(!compactView)}
            className="h-9 gap-1.5 text-xs border-slate-700 text-slate-400 bg-slate-800/50 hover:border-slate-600 hover:text-slate-300"
          >
            {compactView ? (
              <LayoutGrid className="size-3.5" />
            ) : (
              <Grid3X3 className="size-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Source filter */}
      {showSourceFilter && (
        <div className="flex flex-wrap gap-2 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
          {ALL_SOURCES.map((source) => {
            const isSelected = selectedSources.includes(source);
            return (
              <button key={source} onClick={() => handleToggleSource(source)}>
                <Badge
                  variant="outline"
                  className={`cursor-pointer transition-all text-xs px-2.5 py-1 ${
                    isSelected
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                      : "bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300"
                  }`}
                >
                  {SOURCE_LABELS[source]}
                </Badge>
              </button>
            );
          })}
          {selectedSources.length > 0 && (
            <button
              onClick={() => setSelectedSources([])}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors ml-1"
            >
              清除
            </button>
          )}
        </div>
      )}

      {/* Category chips */}
      <CategoryChips
        categories={categories}
        selected={selectedCategories}
        onToggle={handleToggleCategory}
        onClear={handleClearCategories}
      />

      {/* Statistics */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span>
          显示 {filteredPrompts.length} / {prompts.length} 条提示词
        </span>
        {(selectedCategories.length > 0 || selectedSources.length > 0 || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedSources([]);
              setSearchQuery("");
            }}
            className="text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            重置筛选
          </button>
        )}
      </div>

      {/* Prompt grid */}
      {filteredPrompts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-slate-400 text-sm">没有找到匹配的提示词</p>
          <p className="text-slate-500 text-xs mt-1">试试调整搜索条件或清除筛选</p>
        </div>
      ) : (
        <div
          className={`grid gap-3 ${
            compactView
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onClick={() => handleCardClick(prompt)}
            />
          ))}
        </div>
      )}

      {/* Detail dialog */}
      <PromptDetailDialog
        prompt={selectedPrompt}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categories={categories}
        allPrompts={prompts}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
