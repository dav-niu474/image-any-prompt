import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    const categories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const sources = searchParams.get("sources")?.split(",").filter(Boolean) || [];

    const filePath = join(process.cwd(), "public", "data", "prompts.json");
    const fileContents = await readFile(filePath, "utf-8");
    let prompts = JSON.parse(fileContents);

    if (query) {
      prompts = prompts.filter(
        (p: { title: string; prompt: string; tags: string[] }) =>
          p.title.toLowerCase().includes(query) ||
          p.prompt.toLowerCase().includes(query) ||
          p.tags.some((t: string) => t.toLowerCase().includes(query))
      );
    }

    if (categories.length > 0) {
      prompts = prompts.filter((p: { category: string }) =>
        categories.includes(p.category)
      );
    }

    if (sources.length > 0) {
      prompts = prompts.filter((p: { source: string }) =>
        sources.includes(p.source)
      );
    }

    return NextResponse.json({ prompts, total: prompts.length });
  } catch (error) {
    console.error("Error reading prompts:", error);
    return NextResponse.json(
      { error: "Failed to load prompts" },
      { status: 500 }
    );
  }
}
