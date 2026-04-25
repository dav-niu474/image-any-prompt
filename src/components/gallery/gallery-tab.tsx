"use client";

import { useState, useMemo, useCallback } from "react";
import { Prompt, Category, Scenario, CategoriesData, ScenariosData, SOURCE_LABELS, SCENARIO_COLORS, SCENARIO_ICONS, filterPrompts } from "@/lib/prompt-data";
import { SearchBar } from "./search-bar";
import { CategoryChips } from "./category-chips";
import { ScenarioChips } from "./scenario-chips";
import { PromptCard } from "./prompt-card";
import { PromptDetailDialog } from "./prompt-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid3X3, LayoutGrid, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryTabProps {
  prompts: Prompt[];
  categories: Category[];
  scenarios: Scenario[];
}

const ALL_SOURCES = Object.keys(SOURCE_LABELS);

export function GalleryTab({ prompts, categories, scenarios }: GalleryTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSourceFilter, setShowSourceFilter] = useState(false);
  const [showScenarioFilter, setShowScenarioFilter] = useState(false);
  const [compactView, setCompactView] = useState(false);

  const filteredPrompts = useMemo(
    () => filterPrompts(prompts, searchQuery, selectedCategories, selectedSources, selectedScenarios),
    [prompts, searchQuery, selectedCategories, selectedSources, selectedScenarios]
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

  const handleToggleScenario = useCallback((scenarioId: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(scenarioId)
        ? prev.filter((s) => s !== scenarioId)
        : [...prev, scenarioId]
    );
  }, []);

  const handleClearScenarios = useCallback(() => {
    setSelectedScenarios([]);
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
            onClick={() => setShowScenarioFilter(!showScenarioFilter)}
            className={`h-9 gap-1.5 text-xs ${
              selectedScenarios.length > 0
                ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                : "border-slate-700 text-slate-400 bg-slate-800/50 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            <Layers className="size-3.5" />
            应用场景 {selectedScenarios.length > 0 && `(${selectedScenarios.length})`}
          </Button>
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

      {/* Scenario filter */}
      {showScenarioFilter && (
        <div className="flex flex-wrap gap-2 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <span className="text-xs text-slate-500 w-full mb-1">按应用场景筛选</span>
          {scenarios.map((scenario) => {
            const isSelected = selectedScenarios.includes(scenario.id);
            const colorClasses = SCENARIO_COLORS[scenario.id] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
            return (
              <button key={scenario.id} onClick={() => handleToggleScenario(scenario.id)}>
                <Badge
                  variant="outline"
                  className={`cursor-pointer transition-all text-xs px-2.5 py-1 ${
                    isSelected
                      ? colorClasses + " ring-1 ring-current/30"
                      : "bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300"
                  }`}
                >
                  {scenario.label}
                </Badge>
              </button>
            );
          })}
          {selectedScenarios.length > 0 && (
            <button
              onClick={() => setSelectedScenarios([])}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors ml-1"
            >
              清除
            </button>
          )}
        </div>
      )}

      {/* Source filter */}
      {showSourceFilter && (
        <div className="flex flex-wrap gap-2 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <span className="text-xs text-slate-500 w-full mb-1">按数据来源筛选</span>
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
        {(selectedCategories.length > 0 || selectedSources.length > 0 || selectedScenarios.length > 0 || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedSources([]);
              setSelectedScenarios([]);
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
              scenarios={scenarios}
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
        scenarios={scenarios}
        allPrompts={prompts}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
