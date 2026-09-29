import React from 'react';
import { readJsonStore } from '@/lib/jsonStore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductGallery } from '@/components/ecommerce/ProductGallery';
import { ProductActions } from '@/components/ecommerce/ProductActions';

export default async function CustomerQuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const quotes = readJsonStore<any>('quotes.json');
  const quote = quotes.find((q: any) => q.id === id);
  
  if (!quote) {
    notFound();
  }

  const allProducts = readJsonStore<any>('products.json');
  const quoteProducts = allProducts.filter((p: any) => quote.productIds.includes(p.id));

  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-0 pb-12">
      <div className="bg-[var(--color-brand-burgundy)] text-white py-10 md:py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-200 font-bold mb-1">Private Showcase</p>
          <h1 className="font-serif text-3xl md:text-4xl mb-3">Curated for {quote.customerName}</h1>
          <p className="font-sans text-white/80 max-w-2xl mx-auto">
            We have carefully selected these premium pieces based on your requirements.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {quoteProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-[var(--color-brand-border)]">
            <p className="text-xl text-[var(--color-brand-muted)]">No products found in this selection.</p>
          </div>
        ) : (
          <div className="space-y-24">
            {quoteProducts.map((product: any) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-[var(--color-brand-border)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-8 bg-gray-50 flex items-center justify-center">
                    {(() => {
                      const mainImage = product.images?.[0]?.url || product.image || '/images/placeholder.png';
                      let allImages = product.images?.map((img: any) => img.url) || [mainImage];
                      if (allImages.length === 0) {
                        allImages = [mainImage];
                      }
                      return (
                        <ProductGallery images={allImages} productName={product.name} isZoomable={true} />
                      );
                    })()}
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-2">
                      <span className="text-sm font-bold tracking-widest uppercase text-[var(--color-brand-orange)]">
                        {product.collectionId || 'Bhadohi Arts Weave'}
                      </span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)] mb-4">{product.name}</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      {product.description || "Premium handcrafted carpet."}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                      <div className="bg-[#FAF7F0] p-4 rounded-lg">
                        <p className="text-gray-500 font-semibold mb-1">Quality</p>
                        <p className="text-[var(--color-brand-dark)] font-medium">Handknotted</p>
                      </div>
                      <div className="bg-[#FAF7F0] p-4 rounded-lg">
                        <p className="text-gray-500 font-semibold mb-1">Material</p>
                        <p className="text-[var(--color-brand-dark)] font-medium">Wool & Silk</p>
                      </div>
                    </div>

                    <div className="mt-auto">
                       <ProductActions product={{
                         ...product,
                         image: product.images?.[0]?.url || product.image || '/images/placeholder.png'
                       }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
