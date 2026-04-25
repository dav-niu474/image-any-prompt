"use client";

import { useState, useMemo, useCallback } from "react";
import { Prompt, Category, Scenario, SOURCE_LABELS, SCENARIO_COLORS, filterPrompts } from "@/lib/prompt-data";
import { SearchBar } from "./search-bar";
import { CategoryChips } from "./category-chips";
import { ScenarioChips } from "./scenario-chips";
import { PromptCard } from "./prompt-card";
import { PromptDetailDialog } from "./prompt-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Grid3X3, LayoutGrid, Layers, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryTabProps {
  prompts: Prompt[];
  categories: Category[];
  scenarios: Scenario[];
}

const ALL_SOURCES = Object.keys(SOURCE_LABELS);
const PAGE_SIZE = 48;

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
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPrompts = useMemo(
    () => filterPrompts(prompts, searchQuery, selectedCategories, selectedSources, selectedScenarios),
    [prompts, searchQuery, selectedCategories, selectedSources, selectedScenarios]
  );

  // Reset page when filters change
  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  const handleToggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  }, []);

  const handleClearCategories = useCallback(() => {
    setSelectedCategories([]);
    setCurrentPage(1);
  }, []);

  const handleToggleSource = useCallback((source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
    setCurrentPage(1);
  }, []);

  const handleToggleScenario = useCallback((scenarioId: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(scenarioId)
        ? prev.filter((s) => s !== scenarioId)
        : [...prev, scenarioId]
    );
    setCurrentPage(1);
  }, []);

  const handleClearScenarios = useCallback(() => {
    setSelectedScenarios([]);
    setCurrentPage(1);
  }, []);

  const handleCardClick = useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setDialogOpen(true);
  }, []);

  const handleNavigate = useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt);
  }, []);

  // Pagination
  const totalPages = Math.ceil(filteredPrompts.length / PAGE_SIZE);
  const paginatedPrompts = useMemo(
    () => filteredPrompts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredPrompts, currentPage]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Generate page numbers for display
  const getPageNumbers = useCallback(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className="space-y-4">
      {/* Search and controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <div className="flex gap-2 items-center shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setShowScenarioFilter(!showScenarioFilter); setShowSourceFilter(false); }}
            className={`h-9 gap-1.5 text-xs ${
              selectedScenarios.length > 0
                ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                : "border-slate-700 text-slate-400 bg-slate-800/50 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            <Layers className="size-3.5" />
            场景 {selectedScenarios.length > 0 && `(${selectedScenarios.length})`}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setShowSourceFilter(!showSourceFilter); setShowScenarioFilter(false); }}
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
              onClick={handleClearScenarios}
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
              onClick={() => { setSelectedSources([]); setCurrentPage(1); }}
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
        {totalPages > 1 && (
          <span className="text-slate-600">· 第 {currentPage}/{totalPages} 页</span>
        )}
        {(selectedCategories.length > 0 || selectedSources.length > 0 || selectedScenarios.length > 0 || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedSources([]);
              setSelectedScenarios([]);
              setSearchQuery("");
              setCurrentPage(1);
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
          {paginatedPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              scenarios={scenarios}
              onClick={() => handleCardClick(prompt)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4 pb-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="h-8 w-8 p-0 border-slate-700 text-slate-400 bg-slate-800/50 hover:border-slate-600 hover:text-slate-300 disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </Button>
          {getPageNumbers().map((page, i) =>
            typeof page === "string" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-slate-600 text-xs">...</span>
            ) : (
              <Button
                key={page}
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`h-8 w-8 p-0 text-xs ${
                  currentPage === page
                    ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/15"
                    : "border-slate-700 text-slate-400 bg-slate-800/50 hover:border-slate-600 hover:text-slate-300"
                }`}
              >
                {page}
              </Button>
            )
          )}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="h-8 w-8 p-0 border-slate-700 text-slate-400 bg-slate-800/50 hover:border-slate-600 hover:text-slate-300 disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </Button>
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
