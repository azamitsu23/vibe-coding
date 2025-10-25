import { Client } from "@notionhq/client";

if (!process.env.NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is not defined in environment variables");
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const NEWS_DATABASE_ID = process.env.NOTION_NEWS_DATABASE_ID || "";
export const CATALOG_DATABASE_ID = process.env.NOTION_CATALOG_DATABASE_ID || "";
