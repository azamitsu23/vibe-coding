// News types
export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  published_at: string;
  created_at: string;
}

// Catalog types
export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image_url?: string;
  content: string;
  is_active: boolean;
  created_at: string;
}

// Form types
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
