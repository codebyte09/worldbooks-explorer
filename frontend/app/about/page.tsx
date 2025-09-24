import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">About This Project</h1>
      <p className="text-lg">
        This is a full-stack assignment to build a product exploration platform using a NestJS backend and a Next.js frontend.
      </p>
      <p className="mt-4 text-lg">
        The backend handles data scraping from a live website and serves it via a RESTful API. The frontend uses Next.js with React Query to fetch this data and display it in a responsive, user-friendly interface.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Technologies Used</h2>
        <ul className="list-disc list-inside mt-2">
          <li>Frontend: React (Next.js), TypeScript, Tailwind CSS, React Query</li>
          <li>Backend: NestJS (Node.js), TypeScript</li>
        </ul>
      </div>
      <div className="mt-8">
        <Link href="/">
          <p className="text-blue-600 hover:underline">Go back to the homepage</p>
        </Link>
      </div>
    </main>
  );
}