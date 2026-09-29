import React from 'react';
import { ProductCard, ProductType } from './ProductCard';

interface ProductGridProps {
  products: ProductType[];
  title?: string;
  description?: string;
}

export function ProductGrid({ products, title, description }: ProductGridProps) {
  return (
    <div className="w-full">
      {/* Header */}
      {(title || description) && (
        <div className="mb-10 text-center md:text-left">
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[var(--color-brand-muted)] max-w-2xl font-sans">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Empty State */}
      {products.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-[var(--color-brand-muted)]">No products found in this collection.</p>
        </div>
      )}
    </div>
  );
}
