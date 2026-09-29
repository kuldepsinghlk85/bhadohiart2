import React from 'react';
import Link from 'next/link';

export default function EditCollectionPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Edit Category / Portfolio</h1>
      <p className="text-gray-500 mt-4 mb-8">This page is under construction. Please use the "Create New Category" feature for now.</p>
      <Link href="/admin/collections" className="text-orange-600 hover:underline">
        &larr; Back to Categories
      </Link>
    </div>
  );
}
