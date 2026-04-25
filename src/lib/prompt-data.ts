export interface Prompt {
  id: string;
  title: string;
  category: string;
  scenario: string;
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

export interface Scenario {
  id: string;
  label: string;
  labelEn: string;
}

export interface CategoriesData {
  categories: Category[];
}

export interface ScenariosData {
  scenarios: Scenario[];
}

export const SOURCE_LABELS: Record<string, string> = {
  "opennana-nano": "OpenNana Nano",
  "opennana-gpt": "OpenNana GPT",
  "awesome-gpt-image": "Awesome GPT Image",
  "awesome-gpt-image-2": "Awesome GPT Image 2",
  "novel-cover": "小说封面设计",
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

export const SCENARIO_COLORS: Record<string, string> = {
  ecommerce: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "social-media": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "brand-design": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  advertising: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  education: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "game-dev": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "interior-arch": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "fashion-editorial": "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
  "food-beverage": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "personal-art": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  publishing: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "film-media": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "ui-ux": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "novel-cover": "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export const SCENARIO_ICONS: Record<string, string> = {
  ecommerce: "🛒",
  "social-media": "📱",
  "brand-design": "🎨",
  advertising: "📢",
  education: "📚",
  "game-dev": "🎮",
  "interior-arch": "🏠",
  "fashion-editorial": "👗",
  "food-beverage": "🍜",
  "personal-art": "🎭",
  publishing: "📰",
  "film-media": "🎬",
  "ui-ux": "💻",
  "novel-cover": "📖",
};

export const SOURCE_COLORS: Record<string, string> = {
  "opennana-nano": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "opennana-gpt": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "awesome-gpt-image": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "awesome-gpt-image-2": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "novel-cover": "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function filterPrompts(
  prompts: Prompt[],
  searchQuery: string,
  selectedCategories: string[],
  selectedSources: string[],
  selectedScenarios: string[] = []
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

  if (selectedScenarios.length > 0) {
    filtered = filtered.filter((p) => selectedScenarios.includes(p.scenario));
  }

  return filtered;
}

export interface GeneratePromptRequest {
  subject: string;
  style: string;
  category: string;
  scenario: string;
  aspectRatio: string;
  quality: string;
  language: string;
  scenarioParams: Record<string, string>;
}

export interface GeneratePromptResponse {
  prompt: string;
  model?: string;
}

// ─── Pure Visual Styles (no genre/scene attributes) ───
export const STYLES = [
  { id: "photography", label: "📷 摄影", description: "写实摄影风格" },
  { id: "illustration", label: "🎨 插画", description: "数字插画风格" },
  { id: "3d-render", label: "🧊 3D渲染", description: "三维渲染风格" },
  { id: "anime", label: "🌸 日系动漫", description: "日式动画风格" },
  { id: "sketch", label: "✏️ 素描手绘", description: "手绘素描风格" },
  { id: "watercolor", label: "💧 水彩", description: "水彩画风格" },
  { id: "pixel-art", label: "👾 像素风", description: "复古像素风格" },
  { id: "cyberpunk", label: "🌃 赛博朋克", description: "未来霓虹风格" },
  { id: "chinese-ink", label: "🖌️ 国风水墨", description: "传统水墨画" },
  { id: "minimalist", label: "◽ 极简", description: "极简设计风格" },
  { id: "poster", label: "📰 海报排版", description: "海报与排版" },
  { id: "ui-design", label: "📱 UI界面", description: "界面设计风格" },
];

// ─── Scenario-Specific Parameter System ───

export interface ScenarioParamOption {
  id: string;
  label: string;
}

export interface ScenarioParam {
  key: string;
  label: string;
  options: ScenarioParamOption[];
}

export interface ScenarioConfig {
  defaultAspectRatio: string;
  aspectRatios: { id: string; label: string }[];
  params: ScenarioParam[];
}

export const SCENARIO_CONFIGS: Record<string, ScenarioConfig> = {
  "novel-cover": {
    defaultAspectRatio: "2:3",
    aspectRatios: [
      { id: "2:3", label: "2:3 (起点/番茄)" },
      { id: "3:4", label: "3:4 (晋江)" },
    ],
    params: [
      {
        key: "novelGenre",
        label: "小说类型",
        options: [
          { id: "xianxia", label: "⚔️ 玄幻仙侠" },
          { id: "romance-ancient", label: "🌸 古言言情" },
          { id: "romance-modern", label: "💕 现言都市" },
          { id: "sci-fi", label: "🚀 科幻未来" },
          { id: "mystery", label: "🔮 悬疑推理" },
          { id: "wuxia", label: "🗡️ 武侠江湖" },
          { id: "apocalypse", label: "☢️ 末世废土" },
          { id: "system-litrpg", label: "🎮 系统流" },
          { id: "infinite-loop", label: "🌀 无限流" },
          { id: "historical", label: "🏯 历史军事" },
          { id: "rebirth", label: "🔄 重生穿越" },
          { id: "light-novel", label: "📖 轻小说" },
          { id: "supernatural", label: "👻 灵异恐怖" },
          { id: "farming", label: "🌻 种田日常" },
          { id: "political", label: "🏛️ 官场权谋" },
          { id: "esports", label: "🎮 电竞竞技" },
          { id: "rules-horror", label: "📋 规则怪谈" },
        ],
      },
      {
        key: "platform",
        label: "发布平台",
        options: [
          { id: "qidian", label: "起点中文网" },
          { id: "jinjiang", label: "晋江文学城" },
          { id: "fanqie", label: "番茄小说" },
          { id: "general", label: "通用" },
        ],
      },
      {
        key: "composition",
        label: "封面构图",
        options: [
          { id: "character-focus", label: "人物为主" },
          { id: "scene-focus", label: "场景为主" },
          { id: "concept-design", label: "概念设计" },
          { id: "typography-focus", label: "文字排版为主" },
        ],
      },
    ],
  },

  ecommerce: {
    defaultAspectRatio: "1:1",
    aspectRatios: [
      { id: "1:1", label: "1:1 (主图)" },
      { id: "3:4", label: "3:4 (详情页)" },
      { id: "4:3", label: "4:3 (横版)" },
      { id: "16:9", label: "16:9 (Banner)" },
    ],
    params: [
      {
        key: "productType",
        label: "商品类型",
        options: [
          { id: "food-drink", label: "🍔 食品饮料" },
          { id: "beauty", label: "💄 美妆护肤" },
          { id: "electronics", label: "📱 数码电子" },
          { id: "clothing", label: "👗 服装鞋包" },
          { id: "home", label: "🏠 家居用品" },
          { id: "jewelry", label: "💎 珠宝首饰" },
        ],
      },
      {
        key: "shootingStyle",
        label: "拍摄风格",
        options: [
          { id: "white-bg", label: "白底精修" },
          { id: "lifestyle", label: "场景融入" },
          { id: "creative", label: "创意合成" },
          { id: "flat-lay", label: "平铺摆拍" },
        ],
      },
      {
        key: "background",
        label: "背景风格",
        options: [
          { id: "solid-color", label: "纯色背景" },
          { id: "life-scene", label: "生活场景" },
          { id: "studio-minimal", label: "极简棚拍" },
          { id: "outdoor-natural", label: "户外自然" },
        ],
      },
    ],
  },

  "social-media": {
    defaultAspectRatio: "3:4",
    aspectRatios: [
      { id: "1:1", label: "1:1 (Instagram)" },
      { id: "3:4", label: "3:4 (小红书)" },
      { id: "9:16", label: "9:16 (抖音/Story)" },
      { id: "4:3", label: "4:3" },
    ],
    params: [
      {
        key: "platform",
        label: "社交平台",
        options: [
          { id: "xiaohongshu", label: "📕 小红书" },
          { id: "douyin", label: "🎵 抖音" },
          { id: "weibo", label: "📱 微博" },
          { id: "instagram", label: "📷 Instagram" },
          { id: "wechat", label: "💬 朋友圈" },
        ],
      },
      {
        key: "contentType",
        label: "内容类型",
        options: [
          { id: "selfie-portrait", label: "人像自拍" },
          { id: "lifestyle", label: "生活分享" },
          { id: "food-travel", label: "探店打卡" },
          { id: "ootd", label: "穿搭展示" },
          { id: "scenery", label: "旅行风景" },
        ],
      },
      {
        key: "mood",
        label: "氛围调性",
        options: [
          { id: "fresh-natural", label: "清新自然" },
          { id: "retro-vintage", label: "复古怀旧" },
          { id: "trendy-cool", label: "潮流酷炫" },
          { id: "warm-healing", label: "温暖治愈" },
        ],
      },
    ],
  },

  "brand-design": {
    defaultAspectRatio: "1:1",
    aspectRatios: [
      { id: "1:1", label: "1:1 (Logo)" },
      { id: "4:3", label: "4:3 (名片)" },
      { id: "16:9", label: "16:9 (VI展示)" },
      { id: "3:4", label: "3:4" },
    ],
    params: [
      {
        key: "deliverable",
        label: "设计交付物",
        options: [
          { id: "logo", label: "🎯 Logo设计" },
          { id: "vi-system", label: "📐 VI系统" },
          { id: "packaging", label: "📦 包装设计" },
          { id: "brand-materials", label: "📄 品牌物料" },
        ],
      },
      {
        key: "industry",
        label: "所属行业",
        options: [
          { id: "fandb", label: "🍽️ 餐饮" },
          { id: "tech", label: "💻 科技" },
          { id: "fashion", label: "👗 时尚" },
          { id: "education", label: "📚 教育" },
          { id: "health", label: "🏥 健康" },
        ],
      },
      {
        key: "style",
        label: "品牌风格",
        options: [
          { id: "modern-minimal", label: "极简现代" },
          { id: "classic-vintage", label: "复古经典" },
          { id: "handdrawn-creative", label: "手绘创意" },
          { id: "geometric-abstract", label: "几何抽象" },
        ],
      },
    ],
  },

  advertising: {
    defaultAspectRatio: "16:9",
    aspectRatios: [
      { id: "16:9", label: "16:9 (横版广告)" },
      { id: "9:16", label: "9:16 (竖版广告)" },
      { id: "1:1", label: "1:1 (社交广告)" },
      { id: "3:4", label: "3:4 (海报)" },
    ],
    params: [
      {
        key: "adType",
        label: "广告类型",
        options: [
          { id: "poster", label: "📰 海报" },
          { id: "banner", label: "🖼️ Banner" },
          { id: "social-ad", label: "📱 社交广告" },
          { id: "outdoor", label: "🏢 户外广告" },
        ],
      },
      {
        key: "mood",
        label: "情绪调性",
        options: [
          { id: "luxury", label: "✨ 高端奢华" },
          { id: "energetic", label: "🔥 活力热情" },
          { id: "warm", label: "💛 温馨感人" },
          { id: "mysterious", label: "🌑 神秘酷炫" },
        ],
      },
      {
        key: "targetAudience",
        label: "目标受众",
        options: [
          { id: "young", label: "🧑 年轻人" },
          { id: "family", label: "👨‍👩‍👧 家庭" },
          { id: "business", label: "💼 商务" },
          { id: "mass", label: "🌍 大众" },
        ],
      },
    ],
  },

  education: {
    defaultAspectRatio: "4:3",
    aspectRatios: [
      { id: "4:3", label: "4:3 (课件)" },
      { id: "16:9", label: "16:9 (演示)" },
      { id: "1:1", label: "1:1 (社交)" },
      { id: "3:4", label: "3:4 (海报)" },
    ],
    params: [
      {
        key: "contentType",
        label: "内容类型",
        options: [
          { id: "infographic", label: "📊 信息图表" },
          { id: "flowchart", label: "🔄 流程图" },
          { id: "comparison", label: "⚖️ 对比图" },
          { id: "timeline", label: "📅 时间线" },
          { id: "statistics", label: "📈 统计图" },
        ],
      },
      {
        key: "subject",
        label: "学科领域",
        options: [
          { id: "science-tech", label: "🔬 科学技术" },
          { id: "history", label: "📜 历史人文" },
          { id: "nature-geo", label: "🌍 自然地理" },
          { id: "business", label: "💰 商业财经" },
        ],
      },
      {
        key: "visualStyle",
        label: "视觉风格",
        options: [
          { id: "flat-design", label: "🟦 扁平设计" },
          { id: "illustration", label: "🎨 插画风格" },
          { id: "realistic", label: "📷 写实风格" },
          { id: "handdrawn", label: "✏️ 手绘风格" },
        ],
      },
    ],
  },

  "game-dev": {
    defaultAspectRatio: "16:9",
    aspectRatios: [
      { id: "16:9", label: "16:9 (场景/海报)" },
      { id: "1:1", label: "1:1 (图标)" },
      { id: "3:4", label: "3:4 (角色)" },
      { id: "9:16", label: "9:16 (手机)" },
    ],
    params: [
      {
        key: "assetType",
        label: "资源类型",
        options: [
          { id: "character", label: "🎭 角色设计" },
          { id: "environment", label: "🏔️ 场景概念" },
          { id: "ui", label: "📱 UI界面" },
          { id: "item-icon", label: "🔮 道具图标" },
          { id: "poster", label: "📰 宣传海报" },
        ],
      },
      {
        key: "gameGenre",
        label: "游戏类型",
        options: [
          { id: "rpg", label: "⚔️ RPG" },
          { id: "action", label: "💥 动作" },
          { id: "strategy", label: "♟️ 策略" },
          { id: "casual", label: "🌻 休闲" },
          { id: "horror", label: "👻 恐怖" },
        ],
      },
      {
        key: "perspective",
        label: "视角",
        options: [
          { id: "top-down", label: "⬆️ 俯视" },
          { id: "side-view", label: "➡️ 侧视" },
          { id: "isometric", label: "📐 等距" },
          { id: "first-person", label: "👁️ 第一人称" },
          { id: "three-quarter", label: "🔄 3/4视角" },
        ],
      },
    ],
  },

  "interior-arch": {
    defaultAspectRatio: "16:9",
    aspectRatios: [
      { id: "16:9", label: "16:9 (全景)" },
      { id: "4:3", label: "4:3 (局部)" },
      { id: "1:1", label: "1:1 (细节)" },
      { id: "9:16", label: "9:16 (竖版)" },
    ],
    params: [
      {
        key: "roomType",
        label: "空间类型",
        options: [
          { id: "living-room", label: "🛋️ 客厅" },
          { id: "bedroom", label: "🛏️ 卧室" },
          { id: "kitchen", label: "🍳 厨房" },
          { id: "office", label: "💼 办公室" },
          { id: "commercial", label: "🏪 商业空间" },
        ],
      },
      {
        key: "designStyle",
        label: "设计风格",
        options: [
          { id: "modern-minimal", label: "◽ 现代简约" },
          { id: "scandinavian", label: "🌿 北欧" },
          { id: "japanese", label: "🏯 日式" },
          { id: "industrial", label: "🔧 工业风" },
          { id: "chinese", label: "🏮 中式" },
        ],
      },
      {
        key: "viewAngle",
        label: "展示角度",
        options: [
          { id: "panoramic", label: "🏞️ 全景" },
          { id: "detail", label: "🔍 局部特写" },
          { id: "floor-plan", label: "📐 俯视平面图" },
          { id: "3d-perspective", label: "🧊 3D透视" },
        ],
      },
    ],
  },

  "fashion-editorial": {
    defaultAspectRatio: "3:4",
    aspectRatios: [
      { id: "3:4", label: "3:4 (杂志)" },
      { id: "9:16", label: "9:16 (竖版大片)" },
      { id: "1:1", label: "1:1 (社交)" },
      { id: "4:3", label: "4:3 (Lookbook)" },
    ],
    params: [
      {
        key: "shootType",
        label: "拍摄类型",
        options: [
          { id: "haute-couture", label: "✨ 高定大片" },
          { id: "street-style", label: "🏙️ 街拍" },
          { id: "product-showcase", label: "📦 产品展示" },
          { id: "magazine-cover", label: "📰 杂志封面" },
          { id: "lookbook", label: "📘 Lookbook" },
        ],
      },
      {
        key: "season",
        label: "季节",
        options: [
          { id: "spring-summer", label: "🌸 春夏" },
          { id: "fall-winter", label: "🍂 秋冬" },
        ],
      },
      {
        key: "mood",
        label: "氛围调性",
        options: [
          { id: "avant-garde", label: "🖤 高冷前卫" },
          { id: "romantic", label: "💕 甜美浪漫" },
          { id: "street-urban", label: "🌆 街头潮流" },
          { id: "clean-minimal", label: "◽ 极简质感" },
        ],
      },
    ],
  },

  "food-beverage": {
    defaultAspectRatio: "4:3",
    aspectRatios: [
      { id: "1:1", label: "1:1 (社交)" },
      { id: "4:3", label: "4:3 (菜单)" },
      { id: "3:4", label: "3:4 (海报)" },
      { id: "16:9", label: "16:9 (视频封面)" },
    ],
    params: [
      {
        key: "foodType",
        label: "美食类型",
        options: [
          { id: "chinese", label: "🥢 中餐" },
          { id: "western", label: "🍝 西餐" },
          { id: "dessert", label: "🍰 甜点烘焙" },
          { id: "drinks", label: "🍹 饮品" },
          { id: "fast-food", label: "🍔 快餐" },
        ],
      },
      {
        key: "presentation",
        label: "呈现方式",
        options: [
          { id: "fine-plating", label: "🍽️ 精致摆盘" },
          { id: "flat-lay", label: "📸 俯拍平铺" },
          { id: "action-shot", label: "🍳 动态制作" },
          { id: "scene-integrated", label: "🏡 场景融入" },
        ],
      },
      {
        key: "setting",
        label: "拍摄场景",
        options: [
          { id: "restaurant", label: "🍽️ 餐厅" },
          { id: "home-kitchen", label: "🏠 家庭厨房" },
          { id: "outdoor", label: "🌿 户外" },
          { id: "studio", label: "💡 棚拍白底" },
        ],
      },
    ],
  },

  "personal-art": {
    defaultAspectRatio: "1:1",
    aspectRatios: [
      { id: "1:1", label: "1:1" },
      { id: "3:4", label: "3:4" },
      { id: "4:3", label: "4:3" },
      { id: "16:9", label: "16:9" },
    ],
    params: [
      {
        key: "artType",
        label: "创作类型",
        options: [
          { id: "concept-art", label: "🎭 概念艺术" },
          { id: "surreal", label: "🌀 超现实" },
          { id: "abstract", label: "🎨 抽象表达" },
          { id: "experimental", label: "🧪 实验创作" },
        ],
      },
      {
        key: "medium",
        label: "创作媒介",
        options: [
          { id: "digital-painting", label: "💻 数字绘画" },
          { id: "oil-painting", label: "🖼️ 油画风格" },
          { id: "watercolor", label: "💧 水彩" },
          { id: "mixed-media", label: "🎨 混合媒介" },
        ],
      },
    ],
  },

  publishing: {
    defaultAspectRatio: "3:4",
    aspectRatios: [
      { id: "2:3", label: "2:3 (书籍)" },
      { id: "3:4", label: "3:4 (杂志)" },
      { id: "4:3", label: "4:3" },
      { id: "16:9", label: "16:9 (电子书)" },
    ],
    params: [
      {
        key: "publicationType",
        label: "出版物类型",
        options: [
          { id: "book-cover", label: "📕 书籍封面" },
          { id: "magazine", label: "📰 杂志排版" },
          { id: "newspaper", label: "📄 报纸版面" },
          { id: "catalog", label: "📘 画册" },
        ],
      },
      {
        key: "genre",
        label: "内容类型",
        options: [
          { id: "literature", label: "📖 文学" },
          { id: "tech", label: "💻 科技" },
          { id: "children", label: "🧒 儿童" },
          { id: "art", label: "🎨 艺术" },
          { id: "business", label: "💼 商业" },
        ],
      },
    ],
  },

  "film-media": {
    defaultAspectRatio: "2:3",
    aspectRatios: [
      { id: "2:3", label: "2:3 (电影海报)" },
      { id: "16:9", label: "16:9 (剧照)" },
      { id: "9:16", label: "9:16 (手机)" },
      { id: "3:4", label: "3:4" },
    ],
    params: [
      {
        key: "mediaType",
        label: "媒体类型",
        options: [
          { id: "movie-poster", label: "🎬 电影海报" },
          { id: "still", label: "📷 剧照" },
          { id: "title-sequence", label: "🎥 片头设计" },
          { id: "promo", label: "📢 宣传物料" },
        ],
      },
      {
        key: "genre",
        label: "影视类型",
        options: [
          { id: "drama", label: "🎭 剧情" },
          { id: "comedy", label: "😄 喜剧" },
          { id: "horror", label: "👻 恐怖" },
          { id: "sci-fi", label: "🚀 科幻" },
          { id: "action", label: "💥 动作" },
        ],
      },
      {
        key: "mood",
        label: "情绪氛围",
        options: [
          { id: "epic", label: "⚔️ 史诗" },
          { id: "suspense", label: "🌫️ 悬疑" },
          { id: "heartwarming", label: "💛 温馨" },
          { id: "dark", label: "🌑 暗黑" },
        ],
      },
    ],
  },

  "ui-ux": {
    defaultAspectRatio: "3:4",
    aspectRatios: [
      { id: "9:16", label: "9:16 (移动端)" },
      { id: "3:4", label: "3:4 (平板)" },
      { id: "16:9", label: "16:9 (桌面端)" },
      { id: "1:1", label: "1:1 (图标)" },
    ],
    params: [
      {
        key: "appType",
        label: "应用类型",
        options: [
          { id: "mobile-app", label: "📱 移动App" },
          { id: "web", label: "🌐 网页" },
          { id: "mini-program", label: "💬 小程序" },
          { id: "dashboard", label: "📊 管理后台" },
        ],
      },
      {
        key: "industry",
        label: "所属行业",
        options: [
          { id: "social", label: "💬 社交" },
          { id: "ecommerce", label: "🛒 电商" },
          { id: "finance", label: "💰 金融" },
          { id: "education", label: "📚 教育" },
          { id: "tools", label: "🔧 工具" },
        ],
      },
      {
        key: "colorMode",
        label: "色彩模式",
        options: [
          { id: "light", label: "☀️ 亮色" },
          { id: "dark", label: "🌙 暗色" },
          { id: "adaptive", label: "🔄 自适应" },
        ],
      },
    ],
  },
};

// ─── Global Settings (shared across all scenarios) ───

export const QUALITY_LEVELS = [
  { id: "standard", label: "标准" },
  { id: "high", label: "高清" },
  { id: "ultra", label: "极致" },
];

export const LANGUAGES = [
  { id: "english", label: "English" },
  { id: "chinese", label: "中文" },
  { id: "japanese", label: "日本語" },
];
