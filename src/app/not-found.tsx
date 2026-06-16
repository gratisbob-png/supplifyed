import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <h1 className="text-4xl font-bold text-white">Not found</h1>
      <p className="text-gray-400">
        This ingredient, product, or page doesn&rsquo;t exist yet.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors text-sm"
      >
        Back to search
      </Link>
    </div>
  );
}
