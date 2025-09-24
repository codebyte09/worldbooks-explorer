import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  return (
    <article className="p-4 border rounded-md shadow-sm hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block">
        <img src={product.imageUrl || '/placeholder.png'} alt={product.title} className="w-full h-48 object-cover rounded" />
        <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-600">{product.author}</p>
        <div className="mt-2 font-bold">₹{product.price ?? '—'}</div>
      </Link>
    </article>
  );
}