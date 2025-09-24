'use client';
import { useQuery } from '@tanstack/react-query';
import { getNavigation } from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const { data: navigation, isLoading, error } = useQuery({
    queryKey: ['navigation'],
    queryFn: getNavigation,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">World of Books Explorer</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-32 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">World of Books Explorer</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800 mb-4">Failed to load navigation. Using fallback categories.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Books', slug: 'books' },
                { title: 'Children\'s Books', slug: 'childrens-books' },
                { title: 'Fiction', slug: 'fiction' },
                { title: 'Non-Fiction', slug: 'non-fiction' }
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mt-2">Explore {item.title.toLowerCase()}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  const navItems = Array.isArray(navigation) ? navigation : [];

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">World of Books Explorer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and explore books from World of Books with real-time data scraping and intelligent categorization.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-center mb-8">Browse Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {navItems.map((item: any) => (
              <Link
                key={item.id || item.slug}
                href={`/category/${item.slug}`}
                className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">Explore {item.title.toLowerCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">About This Project</h3>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            This is a full-stack product exploration platform built with Next.js, TypeScript, and NestJS. 
            It features real-time web scraping from World of Books, intelligent data caching, and a responsive user interface.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/category/books"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
