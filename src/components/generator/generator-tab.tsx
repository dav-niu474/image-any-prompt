"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Category,
  Scenario,
  GeneratePromptRequest,
  STYLES,
  QUALITY_LEVELS,
  LANGUAGES,
  SCENARIO_CONFIGS,
  ScenarioConfig,
  ScenarioParam,
} from "@/lib/prompt-data";
import { StyleSelector } from "./style-selector";
import { PromptResult } from "./prompt-result";
import { CategoryChips } from "@/components/gallery/category-chips";
import { ScenarioChips } from "@/components/gallery/scenario-chips";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, ChevronDown, History, Cpu, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GeneratorTabProps {
  categories: Category[];
  scenarios: Scenario[];
}

interface HistoryItem {
  id: string;
  prompt: string;
  subject: string;
  style: string;
  scenario: string;
  model: string;
  timestamp: number;
}

function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("prompt-history");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistory(item: HistoryItem) {
  if (typeof window === "undefined") return;
  try {
    const history = getHistory();
    history.unshift(item);
    const trimmed = history.slice(0, 20);
    localStorage.setItem("prompt-history", JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

/** Render a scenario-specific param selector */
function ScenarioParamSelector({
  param,
  selectedValue,
  onSelect,
}: {
  param: ScenarioParam;
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">{param.label}</label>
      <div className="flex flex-wrap gap-1.5">
        {param.options.map((opt) => (
          <button key={opt.id} onClick={() => onSelect(opt.id)}>
            <Badge
              variant="outline"
              className={`cursor-pointer text-xs px-2.5 py-1 transition-all ${
                selectedValue === opt.id
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                  : "bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {opt.label}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}

export function GeneratorTab({ categories, scenarios }: GeneratorTabProps) {
  const [subject, setSubject] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("photography");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string[]>([]);
  const [scenarioParams, setScenarioParams] = useState<Record<string, string>>({});
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quality, setQuality] = useState("high");
  const [language, setLanguage] = useState("chinese");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [usedModel, setUsedModel] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => getHistory());
  const [showHistory, setShowHistory] = useState(false);

  // Get current scenario config
  const currentScenario = selectedScenario.length > 0 ? selectedScenario[0] : "";
  const scenarioConfig: ScenarioConfig | undefined = currentScenario ? SCENARIO_CONFIGS[currentScenario] : undefined;

  // When scenario changes, reset aspect ratio and scenario params
  useEffect(() => {
    if (scenarioConfig) {
      setAspectRatio(scenarioConfig.defaultAspectRatio);
      // Auto-select first option for each param
      const defaults: Record<string, string> = {};
      scenarioConfig.params.forEach((p) => {
        if (p.options.length > 0) {
          defaults[p.key] = p.options[0].id;
        }
      });
      setScenarioParams(defaults);
    } else {
      setAspectRatio("1:1");
      setScenarioParams({});
    }
  }, [currentScenario, scenarioConfig]);

  const handleGenerate = useCallback(async () => {
    if (!subject.trim()) return;

    setGenerating(true);
    setError(null);
    setResult(null);
    setUsedModel("");

    try {
      const requestBody: GeneratePromptRequest = {
        subject: subject.trim(),
        style: STYLES.find((s) => s.id === selectedStyle)?.label || selectedStyle,
        category: selectedCategory.length > 0 ? selectedCategory[0] : "general",
        scenario: currentScenario || "general",
        aspectRatio,
        quality,
        language,
        scenarioParams,
      };

      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "生成失败");
      }

      const data = await response.json();
      setResult(data.prompt);
      setUsedModel(data.model || "NVIDIA");

      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        prompt: data.prompt,
        subject: subject.trim(),
        style: requestBody.style,
        scenario: currentScenario,
        model: data.model || "NVIDIA",
        timestamp: Date.now(),
      };
      saveHistory(historyItem);
      setHistory(getHistory());
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请重试");
    } finally {
      setGenerating(false);
    }
  }, [subject, selectedStyle, selectedCategory, currentScenario, aspectRatio, quality, language, scenarioParams]);

  const handleCategoryToggle = useCallback((categoryId: string) => {
    setSelectedCategory((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [categoryId]
    );
  }, []);

  const handleScenarioToggle = useCallback((scenarioId: string) => {
    setSelectedScenario((prev) =>
      prev.includes(scenarioId) ? prev.filter((s) => s !== scenarioId) : [scenarioId]
    );
  }, []);

  const handleScenarioParamChange = useCallback((key: string, value: string) => {
    setScenarioParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Build scenario-specific param description for display
  const scenarioParamSummary = useMemo(() => {
    if (!scenarioConfig) return "";
    const parts: string[] = [];
    scenarioConfig.params.forEach((p) => {
      const val = scenarioParams[p.key];
      if (val) {
        const opt = p.options.find((o) => o.id === val);
        if (opt) parts.push(opt.label);
      }
    });
    return parts.join(" · ");
  }, [scenarioConfig, scenarioParams]);

  return (
    <div className="space-y-6">
      {/* NVIDIA AI Badge */}
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/10 border border-emerald-500/20 rounded-lg">
        <Cpu className="size-4 text-emerald-400" />
        <span className="text-xs text-emerald-400 font-medium">AI 由 NVIDIA 加速驱动</span>
        <span className="text-[10px] text-slate-500">· Llama 3.3 70B Instruct</span>
      </div>

      {/* Subject Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">
          描述你想要生成的内容
        </label>
        <Textarea
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={
            currentScenario === "novel-cover"
              ? "例如：一个修仙者在星空下御剑飞行，背景是仙山楼阁..."
              : currentScenario === "ecommerce"
                ? "例如：一款薄荷绿包装的面膜产品，主打补水保湿..."
                : "例如：一只穿着宇航服的猫站在月球上，背景是地球..."
          }
          className="min-h-24 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 resize-y"
        />
      </div>

      {/* Style Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">视觉风格</label>
        <StyleSelector selected={selectedStyle} onSelect={setSelectedStyle} />
      </div>

      {/* Scenario Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">应用场景</label>
        <ScenarioChips
          scenarios={scenarios}
          selected={selectedScenario}
          onToggle={handleScenarioToggle}
          onClear={() => setSelectedScenario([])}
        />
      </div>

      {/* Scenario-Specific Parameters */}
      {scenarioConfig && (
        <div className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-emerald-500/15">
          <div className="flex items-center gap-2">
            <Settings2 className="size-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">场景专属参数</span>
            {scenarioParamSummary && (
              <span className="text-[10px] text-slate-500 ml-auto">{scenarioParamSummary}</span>
            )}
          </div>
          {scenarioConfig.params.map((param) => (
            <ScenarioParamSelector
              key={param.key}
              param={param}
              selectedValue={scenarioParams[param.key] || ""}
              onSelect={(value) => handleScenarioParamChange(param.key, value)}
            />
          ))}
        </div>
      )}

      {/* Category Selection (collapsible) */}
      <div className="space-y-2">
        <button
          onClick={() => {
            const chips = document.getElementById("category-section");
            chips?.classList.toggle("hidden");
          }}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-300 transition-colors"
        >
          <ChevronDown className="size-3.5" />
          内容类别（可选）
        </button>
        <div id="category-section" className="hidden">
          <CategoryChips
            categories={categories}
            selected={selectedCategory}
            onToggle={handleCategoryToggle}
            onClear={() => setSelectedCategory([])}
          />
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-3">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-300 transition-colors"
        >
          <ChevronDown
            className={`size-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
          />
          通用设置
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
            {/* Aspect Ratio - scenario-specific if available */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">
                宽高比
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(scenarioConfig?.aspectRatios || [{ id: "1:1", label: "1:1" }, { id: "3:4", label: "3:4" }, { id: "4:3", label: "4:3" }, { id: "9:16", label: "9:16" }, { id: "16:9", label: "16:9" }]).map((ar) => (
                  <button key={ar.id} onClick={() => setAspectRatio(ar.id)}>
                    <Badge
                      variant="outline"
                      className={`cursor-pointer text-xs px-2.5 py-1 transition-all ${
                        aspectRatio === ar.id
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                          : "bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300"
                      }`}
                    >
                      {ar.label}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Level */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">
                画质等级
              </label>
              <div className="flex flex-wrap gap-1.5">
                {QUALITY_LEVELS.map((ql) => (
                  <button key={ql.id} onClick={() => setQuality(ql.id)}>
                    <Badge
                      variant="outline"
                      className={`cursor-pointer text-xs px-2.5 py-1 transition-all ${
                        quality === ql.id
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                          : "bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300"
                      }`}
                    >
                      {ql.label}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">
                输出语言
              </label>
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGES.map((lang) => (
                  <button key={lang.id} onClick={() => setLanguage(lang.id)}>
                    <Badge
                      variant="outline"
                      className={`cursor-pointer text-xs px-2.5 py-1 transition-all ${
                        language === lang.id
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                          : "bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300"
                      }`}
                    >
                      {lang.label}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={generating || !subject.trim()}
        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white h-11 px-8 text-sm font-medium gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {generating ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            生成中...
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            生成提示词
          </>
        )}
      </Button>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-2">
          <PromptResult prompt={result} onRegenerate={handleGenerate} />
          {usedModel && (
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <Cpu className="size-3" />
              <span>模型：{usedModel}</span>
            </div>
          )}
        </div>
      )}

      {/* History */}
      <div className="space-y-2">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-300 transition-colors"
        >
          <History className="size-4" />
          历史记录 ({history.length})
          <ChevronDown
            className={`size-3.5 transition-transform ${showHistory ? "rotate-180" : ""}`}
          />
        </button>

        {showHistory && history.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setResult(item.prompt);
                  setSubject(item.subject);
                }}
                className="w-full text-left p-3 bg-slate-800/40 border border-slate-700/30 rounded-lg hover:border-slate-600/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <div className="flex gap-1.5">
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-green-500/10 text-green-400 border-green-500/30"
                    >
                      <Cpu className="size-2.5 mr-0.5" />
                      {item.model}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-slate-700/50 text-slate-400 border-slate-600/50"
                    >
                      {item.style}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
                  {item.prompt}
                </p>
              </button>
            ))}
          </div>
        )}

        {showHistory && history.length === 0 && (
          <p className="text-xs text-slate-500 py-2">暂无历史记录</p>
        )}
      </div>
    </div>
  );
}
