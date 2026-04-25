import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GPT Image 2 提示词精华库 | Awesome Prompt Gallery",
  description: "精选 160+ 条高质量 GPT Image 2 提示词，涵盖摄影、人像、海报、UI、角色设计等 19 个类别。支持 AI 智能生成提示词，快速复制，探索灵感。",
  keywords: ["GPT Image 2", "提示词", "Prompt", "AI绘画", "OpenAI", "图片生成", "Prompt Engineering"],
  authors: [{ name: "GPT Image 2 Prompt Gallery" }],
  icons: {
    icon: "/logo-icon.png",
  },
  openGraph: {
    title: "GPT Image 2 提示词精华库",
    description: "精选 160+ 条高质量 GPT Image 2 提示词，涵盖 19 个类别",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
