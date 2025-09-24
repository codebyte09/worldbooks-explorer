'use client';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const pageParam = Number(searchParams.get('page') || '1');
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', slug, query, pageParam],
    queryFn: () => getProducts(slug, query, pageParam, 12),
  });

  if (isLoading) return <div className="p-8">Loading products…</div>;
  if (error) return <div className="p-8">Failed to load</div>;
  const products = Array.isArray(data) ? data : (data?.items ?? []);
  

return (
  <div>
    <h1 className="text-3xl font-bold mb-4">Books</h1>
    {!products.length && (
      <p className="text-gray-600 mb-4">No products found. Try a different search.</p>
    )}
    {query && (
      <p className="text-lg text-gray-600 mb-4">
        Showing results for: "{query}"
      </p>
    )}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((p: any) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
    {!!data?.total && (
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          className="px-3 py-2 border rounded disabled:opacity-50"
          onClick={() => {
            const sp = new URLSearchParams(searchParams.toString());
            sp.set('page', String(Math.max(1, pageParam - 1)));
            router.push(`/category/${slug}?${sp.toString()}`);
          }}
          disabled={pageParam <= 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {data.page ?? pageParam} of {data.pages ?? Math.ceil((data.total || 0) / (data.limit || 12))}</span>
        <button
          className="px-3 py-2 border rounded disabled:opacity-50"
          onClick={() => {
            const nextPage = (data.pages ? Math.min((data.pages as number), pageParam + 1) : pageParam + 1);
            const sp = new URLSearchParams(searchParams.toString());
            sp.set('page', String(nextPage));
            router.push(`/category/${slug}?${sp.toString()}`);
          }}
          disabled={!!data?.pages && pageParam >= (data.pages as number)}
        >
          Next
        </button>
      </div>
    )}
  </div>
);
}