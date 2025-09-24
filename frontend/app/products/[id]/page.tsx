'use client';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/lib/api';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProduct(params.id),
  });

  if (isLoading) return <div className="p-8">Loading product details...</div>;
  if (error) return <div className="p-8">Failed to load product details</div>;

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={product.imageUrl || '/placeholder.png'} alt={product.title} className="w-full object-cover rounded-md" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-lg text-gray-600">by {product.author}</p>
          <div className="mt-4 font-bold text-2xl">₹{product.price ?? '—'}</div>
          {/* You can add more details, reviews, and ratings here based on your assignment */}
        </div>
      </div>
    </div>
  );
}