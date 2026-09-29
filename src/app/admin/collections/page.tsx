import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { readJsonStore } from '@/lib/jsonStore';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { mockCollections } from '@/lib/mockData';
import { revalidatePath } from 'next/cache';
import { deleteJsonItem } from '@/lib/jsonStore';

async function deleteCollection(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  
  try {
    await prisma.collection.delete({ where: { id } });
  } catch (e) {
    // Delete from JSON
    deleteJsonItem('collections.json', id);
  }
  revalidatePath('/admin/collections');
  revalidatePath('/collections');
}

export default async function AdminCollectionsPage() {
  let collections: any[] = [];
  
  try {
    collections = await prisma.collection.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    // Fallback to JSON and mock
    const jsonCollections = readJsonStore<any>('collections.json');
    const jsonProducts = readJsonStore<any>('products.json');
    collections = [...jsonCollections, ...mockCollections].map(c => {
      const productCount = jsonProducts.filter((p: any) => p.collectionId === c.id || p.collection?.slug === c.slug).length;
      return {
        ...c,
        _count: { products: productCount }
      };
    });
    
    // De-duplicate by slug or name
    const unique = new Map();
    collections.forEach(c => unique.set((c.slug || c.name || c.id).toLowerCase().trim(), c));
    collections = Array.from(unique.values());
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-900 flex items-center gap-2.5">
            Categories &amp; Portfolios 
            <span className="text-xs bg-gradient-to-r from-amber-50 to-rose-50 text-[#990E14] border border-[#DE8B22]/30 px-3 py-1 rounded-full font-bold shadow-2xs">
              {collections.length} Categories
            </span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage handcrafted carpet collections, portfolios, and showcase sliders.
          </p>
        </div>
        <Link 
          href="/admin/collections/new" 
          className="bg-gradient-to-r from-[#990E14] via-[#AB1017] to-[#7B090E] hover:from-[#7B090E] hover:to-[#990E14] text-white px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm hover:shadow-md transition-all tracking-wider uppercase"
        >
          <PlusCircle size={16} className="text-[#DE8B22]" />
          Create New Category
        </Link>
      </div>

      <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF7F0] border-b border-stone-200 text-stone-600 uppercase text-[11px] font-bold tracking-wider">
              <th className="p-3.5 pl-4 font-bold">Image &amp; Name</th>
              <th className="p-3.5 font-bold">Slug</th>
              <th className="p-3.5 font-bold">Products</th>
              <th className="p-3.5 font-bold">Slider Images</th>
              <th className="p-3.5 pr-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {collections.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-stone-500">
                  No categories found. Click &quot;Create New Category&quot; to get started!
                </td>
              </tr>
            ) : (
              collections.map(collection => {
                const mainImage = collection.image || '/images/emerald-meadow.png';
                const sliderCount = collection.sliderImages?.length || 0;
                
                return (
                  <tr key={collection.id || collection.slug} className="hover:bg-[#FAF7F0]/70 transition-colors">
                    <td className="p-3.5 pl-4">
                      <div className="flex items-center gap-3.5">
                        <div className="h-12 w-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0 relative shadow-2xs">
                          <Image 
                            src={mainImage} 
                            alt={collection.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-stone-800">{collection.name}</p>
                          <p className="text-xs text-stone-500 truncate max-w-[220px]">{collection.description || 'No description'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="text-xs font-mono bg-stone-100 px-2 py-0.5 rounded-md text-stone-600 border border-stone-200">
                        /{collection.slug}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {collection._count?.products || 0} Products
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        sliderCount > 0 
                          ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                          : 'bg-stone-50 text-stone-400 border border-stone-200'
                      }`}>
                        {sliderCount} Images
                      </span>
                    </td>
                    <td className="p-3.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/collections/${collection.id || collection.slug}/edit`} 
                          className="p-1.5 text-[#DE8B22] hover:text-white hover:bg-[#DE8B22] border border-[#DE8B22]/30 rounded-lg transition-all shadow-2xs"
                          title="Edit Category"
                        >
                          <Edit size={15} />
                        </Link>
                        <form action={deleteCollection} className="inline-block">
                          <input type="hidden" name="id" value={collection.id} />
                          <button type="submit" className="p-1.5 text-rose-500 hover:text-white hover:bg-rose-600 border border-rose-200 rounded-lg transition-all shadow-2xs" title="Delete Category">
                            <Trash2 size={15} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
