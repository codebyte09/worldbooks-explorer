import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  return (
    <article className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
          <img 
            src={product.image_url || product.imageUrl || '/placeholder.png'} 
            alt={product.title || 'Book cover'} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {product.title || 'Unknown Title'}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            by {product.author || 'Unknown Author'}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-green-600">
              £{product.price || '—'}
            </span>
            <span className="text-xs text-gray-500">
              {product.currency || 'GBP'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}