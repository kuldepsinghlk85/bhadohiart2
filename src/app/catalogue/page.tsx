import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

export default function CataloguePage() {
  const catalogues = [
    {
      id: 1,
      title: "2024 Main Collection",
      description: "Explore our complete range of premium handmade and machine-made carpets for the upcoming season.",
      size: "12 MB",
      cover: "/images/pdf1/img_p1_4.png", // Reusing an existing image
    },
    {
      id: 2,
      title: "Wall-to-Wall Special",
      description: "Dedicated catalogue for hotel, hospital, and commercial wall-to-wall carpet installations.",
      size: "8 MB",
      cover: "/images/pdf1/img_p2_4.png", // Reusing an existing image
    },
    {
      id: 3,
      title: "Luxury Handloom Series",
      description: "A close look at the intricate details of our finest handloom creations and designer collaborations.",
      size: "15 MB",
      cover: "/images/pdf1/img_p3_4.png", // Reusing an existing image
    }
  ];

  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-8 md:pt-10 pb-12">
      
      {/* Header */}
      <div className="container mx-auto px-4 max-w-5xl text-center mb-8">
        <span className="text-[var(--color-brand-burgundy)] font-sans font-bold tracking-widest text-xs uppercase mb-2 block">
          DIGITAL ASSETS
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] mb-3">
          Our Catalogues
        </h1>
        <p className="font-sans text-base text-[var(--color-brand-muted)] max-w-2xl mx-auto">
          Explore our complete range of premium carpets offline. Download our digital catalogues to view high-resolution designs, specifications, and customization options.
        </p>
      </div>
      
      {/* Catalogue Grid */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {catalogues.map((cat) => (
            <div key={cat.id} className="bg-white border border-[var(--color-brand-border)] group hover:border-[var(--color-brand-burgundy)] transition-colors duration-300 flex flex-col">
              
              {/* Cover Image Area */}
              <div className="h-64 relative bg-[#E8E1D5] overflow-hidden p-6 flex justify-center items-end">
                <img 
                  src={cat.cover} 
                  alt={cat.title} 
                  className="w-[80%] h-[90%] object-cover shadow-2xl group-hover:-translate-y-4 transition-transform duration-500 ease-out border border-white/20"
                />
                {/* Decorative overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--color-brand-burgundy)]" />
                  <span className="text-xs font-bold font-sans text-[var(--color-brand-dark)]">PDF</span>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-8 flex-1 flex flex-col">
                <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-3 group-hover:text-[var(--color-brand-burgundy)] transition-colors">
                  {cat.title}
                </h2>
                <p className="font-sans text-[var(--color-brand-muted)] text-sm leading-relaxed mb-6 flex-1">
                  {cat.description}
                </p>
                
                <div className="flex items-center justify-between border-t border-[var(--color-brand-border)] pt-6 mt-auto">
                  <span className="text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider">
                    {cat.size}
                  </span>
                  <Button variant="default" className="flex items-center gap-2 px-6">
                    <Download className="w-4 h-4" />
                    DOWNLOAD
                  </Button>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
