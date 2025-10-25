import { notion, CATALOG_DATABASE_ID } from "./client";
import { CatalogItem } from "@/types";
import { NotionToMarkdown } from "notion-to-md";

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getCatalog(category?: string): Promise<CatalogItem[]> {
  if (!CATALOG_DATABASE_ID) {
    console.warn("CATALOG_DATABASE_ID is not configured");
    return [];
  }

  try {
    const filters: any = {
      property: "is_active",
      checkbox: {
        equals: true,
      },
    };

    if (category) {
      const response = await notion.databases.query({
        database_id: CATALOG_DATABASE_ID,
        filter: {
          and: [
            filters,
            {
              property: "category",
              select: {
                equals: category,
              },
            },
          ],
        },
        sorts: [
          {
            property: "created_at",
            direction: "descending",
          },
        ],
      });

      return response.results.map(mapPageToCatalogItem);
    }

    const response = await notion.databases.query({
      database_id: CATALOG_DATABASE_ID,
      filter: filters,
      sorts: [
        {
          property: "created_at",
          direction: "descending",
        },
      ],
    });

    return response.results.map(mapPageToCatalogItem);
  } catch (error) {
    console.error("Error fetching catalog:", error);
    return [];
  }
}

export async function getCatalogById(id: string): Promise<CatalogItem | null> {
  if (!CATALOG_DATABASE_ID) {
    console.warn("CATALOG_DATABASE_ID is not configured");
    return null;
  }

  try {
    const page: any = await notion.pages.retrieve({ page_id: id });

    if (!page.properties.is_active?.checkbox) {
      return null;
    }

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      id: page.id,
      name: page.properties.name?.title?.[0]?.plain_text || "無題",
      category: page.properties.category?.select?.name || "その他",
      price: page.properties.price?.rich_text?.[0]?.plain_text || "",
      description:
        page.properties.description?.rich_text?.[0]?.plain_text || "",
      image_url: page.properties.image_url?.url || undefined,
      content: mdString.parent || "",
      is_active: page.properties.is_active?.checkbox || false,
      created_at: page.created_time,
    };
  } catch (error) {
    console.error("Error fetching catalog item:", error);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  if (!CATALOG_DATABASE_ID) {
    console.warn("CATALOG_DATABASE_ID is not configured");
    return [];
  }

  try {
    const database: any = await notion.databases.retrieve({
      database_id: CATALOG_DATABASE_ID,
    });

    const categoryProperty = database.properties.category;
    if (categoryProperty?.type === "select" && categoryProperty.select.options) {
      return categoryProperty.select.options.map((option: any) => option.name);
    }

    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

function mapPageToCatalogItem(page: any): CatalogItem {
  return {
    id: page.id,
    name: page.properties.name?.title?.[0]?.plain_text || "無題",
    category: page.properties.category?.select?.name || "その他",
    price: page.properties.price?.rich_text?.[0]?.plain_text || "",
    description:
      page.properties.description?.rich_text?.[0]?.plain_text || "",
    image_url: page.properties.image_url?.url || undefined,
    content: "",
    is_active: page.properties.is_active?.checkbox || false,
    created_at: page.created_time,
  };
}
