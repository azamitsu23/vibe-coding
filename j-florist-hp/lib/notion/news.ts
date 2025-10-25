import { notion, NEWS_DATABASE_ID } from "./client";
import { NewsItem } from "@/types";
import { NotionToMarkdown } from "notion-to-md";

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getNews(limit?: number): Promise<NewsItem[]> {
  if (!NEWS_DATABASE_ID) {
    console.warn("NEWS_DATABASE_ID is not configured");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: NEWS_DATABASE_ID,
      filter: {
        property: "published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "published_at",
          direction: "descending",
        },
      ],
      page_size: limit || 100,
    });

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.title?.title?.[0]?.plain_text || "無題",
      slug: page.properties.slug?.rich_text?.[0]?.plain_text || page.id,
      content: "",
      published: page.properties.published?.checkbox || false,
      published_at:
        page.properties.published_at?.date?.start ||
        page.created_time,
      created_at: page.created_time,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  if (!NEWS_DATABASE_ID) {
    console.warn("NEWS_DATABASE_ID is not configured");
    return null;
  }

  try {
    const response = await notion.databases.query({
      database_id: NEWS_DATABASE_ID,
      filter: {
        and: [
          {
            property: "slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page: any = response.results[0];
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      id: page.id,
      title: page.properties.title?.title?.[0]?.plain_text || "無題",
      slug: page.properties.slug?.rich_text?.[0]?.plain_text || page.id,
      content: mdString.parent || "",
      published: page.properties.published?.checkbox || false,
      published_at:
        page.properties.published_at?.date?.start ||
        page.created_time,
      created_at: page.created_time,
    };
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    return null;
  }
}
