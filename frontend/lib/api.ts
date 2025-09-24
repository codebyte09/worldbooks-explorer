export const getProducts = (categorySlug: string, query?: string, page: number = 1, limit: number = 20) => {
  const params = new URLSearchParams();
  if (categorySlug) params.set('category', categorySlug);
  if (query) params.set('q', query);
  params.set('page', String(page));
  params.set('limit', String(limit));
  const url = `/api/products?${params.toString()}`;
  return fetcher(url);
};

export const getProduct = (id: string) => {
  return fetcher(`/api/products/${encodeURIComponent(id)}`);
};

// Also ensure your fetcher function is correct:
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network error');
  }
  return res.json();
};