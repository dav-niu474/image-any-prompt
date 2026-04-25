"use client";

import { useState, useEffect } from "react";
import { Prompt, Category, Scenario, CategoriesData, ScenariosData } from "@/lib/prompt-data";
import { GalleryTab } from "@/components/gallery/gallery-tab";
import { GeneratorTab } from "@/components/generator/generator-tab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, ImageIcon, Loader2, ExternalLink, Github, Heart, Cpu } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [promptsRes, categoriesRes, scenariosRes] = await Promise.all([
          fetch("/data/prompts.json"),
          fetch("/data/categories.json"),
          fetch("/data/scenarios.json"),
        ]);

        if (!promptsRes.ok || !categoriesRes.ok || !scenariosRes.ok) {
          throw new Error("Failed to load data");
        }

        const promptsData: Prompt[] = await promptsRes.json();
        const categoriesData: CategoriesData = await categoriesRes.json();
        const scenariosData: ScenariosData = await scenariosRes.json();

        setPrompts(promptsData);
        setCategories(categoriesData.categories);
        setScenarios(scenariosData.scenarios);
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载数据失败");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-slate-800/60">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hero-banner.png"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
                <ImageIcon className="size-7 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  GPT Image 2
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    {" "}提示词精华库
                  </span>
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  精选 {prompts.length > 0 ? prompts.length : "160+"} 条高质量提示词 · 涵盖 {categories.length > 0 ? categories.length : "19"} 个类别 · {scenarios.length > 0 ? scenarios.length : "13"} 种应用场景 · NVIDIA AI 驱动
                </p>
              </div>
            </div>

            {/* Source badges */}
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <a
                href="https://github.com/zhenglarry007/opennana-gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all backdrop-blur-sm"
              >
                <Github className="size-3" />
                OpenNana
                <ExternalLink className="size-2.5 opacity-50" />
              </a>
              <a
                href="https://github.com/ZeroLu/awesome-gpt-image"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all backdrop-blur-sm"
              >
                <Github className="size-3" />
                Awesome GPT Image
                <ExternalLink className="size-2.5 opacity-50" />
              </a>
              <a
                href="https://github.com/YouMind-OpenLab/awesome-gpt-image-2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all backdrop-blur-sm"
              >
                <Github className="size-3" />
                YouMind
                <ExternalLink className="size-2.5 opacity-50" />
              </a>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 backdrop-blur-sm"
              >
                📖 小说封面
              </span>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
            {[
              { label: "提示词数量", value: prompts.length || "160+", icon: "📝" },
              { label: "内容类别", value: categories.length || "19", icon: "🏷️" },
              { label: "应用场景", value: scenarios.length || "14", icon: "🎯" },
              { label: "数据来源", value: "5+", icon: "📚" },
              { label: "AI 引擎", value: "NVIDIA", icon: "⚡" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/30 backdrop-blur-sm"
              >
                <span className="text-lg">{stat.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white">{stat.value}</div>
                  <div className="text-[10px] text-slate-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="size-8 text-emerald-500 animate-spin" />
            <p className="text-sm text-slate-400">加载提示词数据中...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="text-4xl">😵</div>
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              重试
            </button>
          </div>
        ) : (
          <Tabs defaultValue="gallery" className="space-y-6">
            <TabsList className="bg-slate-800/60 border border-slate-700/50 p-1 h-auto">
              <TabsTrigger
                value="gallery"
                className="data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/30 text-slate-400 px-5 py-2.5 text-sm gap-2 border border-transparent transition-all"
              >
                <ImageIcon className="size-4" />
                提示词图库
              </TabsTrigger>
              <TabsTrigger
                value="generator"
                className="data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-500/30 text-slate-400 px-5 py-2.5 text-sm gap-2 border border-transparent transition-all"
              >
                <Sparkles className="size-4" />
                提示词生成
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="mt-0">
              <GalleryTab prompts={prompts} categories={categories} scenarios={scenarios} />
            </TabsContent>

            <TabsContent value="generator" className="mt-0">
              <GeneratorTab categories={categories} scenarios={scenarios} />
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>GPT Image 2 提示词精华库</span>
              <span className="text-slate-700">·</span>
              <span>共 {prompts.length} 条提示词 · {categories.length} 个类别 · {scenarios.length} 种场景</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                数据来源：
                <a href="https://github.com/zhenglarry007/opennana-gallery" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">OpenNana</a>
                <span>·</span>
                <a href="https://github.com/ZeroLu/awesome-gpt-image" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Awesome GPT Image</a>
                <span>·</span>
                <a href="https://github.com/YouMind-OpenLab/awesome-gpt-image-2" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">YouMind</a>
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                AI Powered by <Cpu className="size-3 text-green-400" /> NVIDIA
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                Made with <Heart className="size-3 text-rose-500 fill-rose-500" />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
