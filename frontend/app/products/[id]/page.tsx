'use client';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProduct(params.id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="bg-gray-200 h-96 rounded-lg"></div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="bg-gray-200 h-8 rounded"></div>
                <div className="bg-gray-200 h-6 rounded w-3/4"></div>
                <div className="bg-gray-200 h-8 rounded w-1/2"></div>
                <div className="bg-gray-200 h-32 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Failed to Load Product</h1>
            <p className="text-red-600 mb-6">Sorry, we couldn't load the product details.</p>
            <Link
              href="/category/books"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/category/books" className="hover:text-blue-600">Books</Link></li>
            <li>/</li>
            <li className="text-gray-800">{product?.title || 'Product'}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={product?.image_url || product?.imageUrl || '/placeholder.png'} 
                alt={product?.title || 'Book cover'} 
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {product?.title || 'Unknown Title'}
                </h1>
                <p className="text-xl text-gray-600">
                  by {product?.author || 'Unknown Author'}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">
                  £{product?.price || '—'}
                </span>
                <span className="text-sm text-gray-500">
                  {product?.currency || 'GBP'}
                </span>
              </div>

              {/* Product Description */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product?.description || 
                   'This is a sample product description. In a real implementation, this would contain detailed information about the book, including its plot summary, key features, and other relevant details.'}
                </p>
              </div>

              {/* Reviews Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Reviews & Ratings</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">4.2 out of 5 stars</span>
                  </div>
                  <p className="text-sm text-gray-600">Based on sample reviews</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Add to Cart
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}