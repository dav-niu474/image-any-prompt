# Image Any Prompt - GPT Image 2 提示词精华库

<p align="center">
  <strong>精选 160+ 条高质量 AI 图像生成提示词 · 涵盖 19 个类别 · 13 种应用场景 · NVIDIA AI 驱动</strong>
</p>

## ✨ 功能特色

- 🖼️ **提示词图库** - 浏览和搜索 160+ 条精选 AI 图像提示词
- 🎯 **应用场景分类** - 按 13 种应用场景（电商、社交媒体、品牌设计等）筛选提示词
- 🏷️ **多维度筛选** - 支持按类别、来源、场景三维筛选
- ✨ **AI 智能生成** - 基于 NVIDIA Llama 3.1 Nemotron 70B 模型智能生成提示词
- 📋 **一键复制** - 快速复制提示词到剪贴板
- 🔍 **全文搜索** - 搜索标题、提示词内容和标签
- 📱 **响应式设计** - 适配桌面和移动设备
- 🌙 **深色主题** - 舒适的深色界面设计

## 📊 数据来源

本项目汇总了以下开源项目的提示词精华：

| 来源 | 说明 |
|------|------|
| [OpenNana Gallery](https://github.com/zhenglarry007/opennana-gallery) | 纳米提示词精选集合 |
| [Awesome GPT Image](https://github.com/ZeroLu/awesome-gpt-image) | GPT Image 提示词合集 |
| [Awesome GPT Image 2](https://github.com/YouMind-OpenLab/awesome-gpt-image-2) | GPT Image 2 进阶提示词 |
| [Awesome GPTImage2](https://github.com/xianyu110/awesome-gptimage2) | GPT Image 2 社区精选 |

## 🎯 应用场景分类

提示词按以下应用场景进行分类：

| 场景 | 图标 | 说明 |
|------|------|------|
| 电商产品 | 🛒 | 产品摄影、电商主图、商品展示 |
| 社交媒体 | 📱 | 社交平台内容、个人分享 |
| 品牌设计 | 🎨 | 品牌标识、视觉识别系统 |
| 广告营销 | 📢 | 广告创意、营销推广物料 |
| 教育科普 | 📚 | 信息图表、教育可视化 |
| 游戏开发 | 🎮 | 游戏角色、场景资源 |
| 室内建筑 | 🏠 | 室内设计、建筑可视化 |
| 时尚编辑 | 👗 | 时尚摄影、编辑排版 |
| 美食餐饮 | 🍜 | 美食摄影、菜单设计 |
| 个人创作 | 🎭 | 个人艺术创作、实验性作品 |
| 出版印刷 | 📰 | 书籍封面、杂志编辑 |
| 影视媒体 | 🎬 | 电影海报、视频制作 |
| 界面设计 | 💻 | UI/UX 设计、应用界面 |

## 🤖 AI 提示词生成

本项目集成了 NVIDIA AI 模型服务，支持智能提示词生成：

- **主模型**：NVIDIA Llama 3.1 Nemotron 70B Instruct
- **备选模型**：GPT-4o Mini（自动降级）
- **支持参数**：风格、类别、应用场景、宽高比、画质等级、输出语言

## 🛠️ 技术栈

- **框架**：Next.js 16 (App Router)
- **语言**：TypeScript 5
- **样式**：Tailwind CSS 4 + shadcn/ui
- **AI 模型**：NVIDIA Llama 3.1 Nemotron 70B / GPT-4o Mini
- **部署**：Vercel

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
bun install
```

### 配置环境变量

创建 `.env.local` 文件：

```env
NVIDIA_API_KEY=your_nvidia_api_key
```

### 启动开发服务器

```bash
npm run dev
# 或
bun run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📁 项目结构

```
├── public/
│   └── data/
│       ├── prompts.json        # 提示词数据
│       ├── categories.json     # 类别数据
│       └── scenarios.json      # 应用场景数据
├── src/
│   ├── app/
│   │   ├── page.tsx            # 主页面
│   │   ├── layout.tsx          # 布局
│   │   └── api/
│   │       └── generate-prompt/  # AI 生成 API
│   ├── components/
│   │   ├── gallery/            # 图库相关组件
│   │   │   ├── gallery-tab.tsx
│   │   │   ├── prompt-card.tsx
│   │   │   ├── prompt-detail-dialog.tsx
│   │   │   ├── category-chips.tsx
│   │   │   ├── scenario-chips.tsx
│   │   │   └── search-bar.tsx
│   │   └── generator/          # 生成器相关组件
│   │       ├── generator-tab.tsx
│   │       ├── style-selector.tsx
│   │       └── prompt-result.tsx
│   └── lib/
│       ├── prompt-data.ts      # 数据类型与常量
│       └── utils.ts            # 工具函数
└── package.json
```

## 📄 License

MIT License

## 🙏 致谢

感谢所有开源项目贡献者的辛勤工作，本项目的数据来源于以上提到的开源仓库。
