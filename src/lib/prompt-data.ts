export interface Prompt {
  id: string;
  title: string;
  category: string;
  tags: string[];
  prompt: string;
  source: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  label: string;
  labelEn: string;
}

export interface CategoriesData {
  categories: Category[];
}

export const SOURCE_LABELS: Record<string, string> = {
  "opennana-nano": "OpenNana Nano",
  "opennana-gpt": "OpenNana GPT",
  "awesome-gpt-image": "Awesome GPT Image",
  "awesome-gpt-image-2": "Awesome GPT Image 2",
};

export const CATEGORY_COLORS: Record<string, string> = {
  photography: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  portrait: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  poster: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  ui: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  character: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  gaming: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  food: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "3d": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  fashion: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  logo: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  infographic: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "paper-craft": "bg-lime-500/20 text-lime-400 border-lime-500/30",
  landscape: "bg-green-500/20 text-green-400 border-green-500/30",
  minimalist: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  futuristic: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
  comparison: "bg-red-500/20 text-red-400 border-red-500/30",
  video: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  editing: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  interior: "bg-warm-500/20 text-amber-300 border-amber-500/30",
};

export const CATEGORY_DOT_COLORS: Record<string, string> = {
  photography: "bg-emerald-500",
  portrait: "bg-violet-500",
  poster: "bg-rose-500",
  ui: "bg-cyan-500",
  character: "bg-amber-500",
  gaming: "bg-orange-500",
  food: "bg-yellow-500",
  "3d": "bg-teal-500",
  fashion: "bg-pink-500",
  logo: "bg-indigo-500",
  infographic: "bg-blue-500",
  "paper-craft": "bg-lime-500",
  landscape: "bg-green-500",
  minimalist: "bg-slate-400",
  futuristic: "bg-fuchsia-500",
  comparison: "bg-red-500",
  video: "bg-purple-500",
  editing: "bg-sky-500",
  interior: "bg-amber-500",
};

export const CATEGORY_ICONS: Record<string, string> = {
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

export const SOURCE_COLORS: Record<string, string> = {
  "opennana-nano": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "opennana-gpt": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "awesome-gpt-image": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "awesome-gpt-image-2": "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function filterPrompts(
  prompts: Prompt[],
  searchQuery: string,
  selectedCategories: string[],
  selectedSources: string[]
): Prompt[] {
  let filtered = prompts;

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.prompt.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((p) => selectedCategories.includes(p.category));
  }

  if (selectedSources.length > 0) {
    filtered = filtered.filter((p) => selectedSources.includes(p.source));
  }

  return filtered;
}

export interface GeneratePromptRequest {
  subject: string;
  style: string;
  category: string;
  aspectRatio: string;
  quality: string;
  language: string;
}

export interface GeneratePromptResponse {
  prompt: string;
}

export const STYLES = [
  { id: "photography", label: "📷 Photography", description: "Realistic photo style" },
  { id: "illustration", label: "🎨 Illustration", description: "Digital illustration" },
  { id: "3d-render", label: "🧊 3D Render", description: "3D rendering style" },
  { id: "anime", label: "🌸 Anime", description: "Japanese animation style" },
  { id: "sketch", label: "✏️ Sketch", description: "Hand-drawn sketch" },
  { id: "watercolor", label: "💧 Watercolor", description: "Watercolor painting" },
  { id: "pixel-art", label: "👾 Pixel Art", description: "Retro pixel style" },
  { id: "cyberpunk", label: "🌃 Cyberpunk", description: "Futuristic neon style" },
  { id: "chinese-ink", label: "🖌️ Chinese Ink", description: "Traditional ink painting" },
  { id: "minimalist", label: "◽ Minimalist", description: "Clean minimal design" },
  { id: "poster", label: "📰 Poster", description: "Poster & typography" },
  { id: "ui-design", label: "📱 UI Design", description: "Interface design" },
];

export const ASPECT_RATIOS = [
  { id: "1:1", label: "1:1" },
  { id: "3:4", label: "3:4" },
  { id: "4:3", label: "4:3" },
  { id: "9:16", label: "9:16" },
  { id: "16:9", label: "16:9" },
];

export const QUALITY_LEVELS = [
  { id: "standard", label: "Standard" },
  { id: "high", label: "High" },
  { id: "ultra", label: "Ultra" },
];

export const LANGUAGES = [
  { id: "english", label: "English" },
  { id: "chinese", label: "中文" },
  { id: "japanese", label: "日本語" },
];
