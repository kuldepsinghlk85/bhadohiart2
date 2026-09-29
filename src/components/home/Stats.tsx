import React from 'react';

export function Stats() {
  const stats = [
    { value: '5000+', label: 'Designs' },
    { value: '1000+', label: 'Projects Completed' },
    { value: '25+', label: 'Cities Served' },
    { value: '100%', label: 'Customer Satisfaction' },
  ];

  return (
    <section className="bg-[var(--color-brand-burgundy)] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/20">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center px-4">
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-2">
                {stat.value}
              </h3>
              <p className="font-sans text-sm tracking-wider text-white/80 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
