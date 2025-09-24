'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/category/books?q=${encodeURIComponent(query)}`);
  };

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="flex justify-between items-center p-4 bg-gray-100">
            <h1 className="text-2xl font-bold">Product Data Explorer</h1>
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books..."
                className="px-4 py-2 border rounded-md"
              />
              <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
            </form>
          </div>
          <div className="p-8">
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}