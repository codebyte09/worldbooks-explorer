const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const getProducts = (categorySlug: string, query?: string, page: number = 1, limit: number = 20) => {
  const params = new URLSearchParams();
  if (categorySlug) params.set('category', categorySlug);
  if (query) params.set('q', query);
  params.set('page', String(page));
  params.set('limit', String(limit));
  const url = `${API_BASE_URL}/products?${params.toString()}`;
  return fetcher(url);
};

export const getProduct = (id: string) => {
  return fetcher(`${API_BASE_URL}/products/${encodeURIComponent(id)}`);
};

export const getNavigation = () => {
  return fetcher(`${API_BASE_URL}/navigation`);
};

export const getCategories = (navigationSlug?: string) => {
  const params = new URLSearchParams();
  if (navigationSlug) params.set('navigation', navigationSlug);
  const url = `${API_BASE_URL}/categories?${params.toString()}`;
  return fetcher(url);
};

export const refreshProducts = (categoryUrl: string) => {
  return fetcher(`${API_BASE_URL}/products/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ categoryUrl }),
  });
};

export const scrapeNavigation = () => {
  return fetcher(`${API_BASE_URL}/scrape/navigation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Enhanced fetcher function with better error handling:
const fetcher = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};