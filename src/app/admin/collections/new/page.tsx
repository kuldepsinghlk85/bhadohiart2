import React from 'react';
import CollectionForm from './CollectionForm';

export default function NewCollectionPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Category / Portfolio</h1>
        <p className="text-sm text-gray-500 mt-1">Add a new product category and upload up to 5 images for its top slider.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <CollectionForm />
      </div>
    </div>
  );
}
