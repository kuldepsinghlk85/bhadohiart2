import React from 'react';
import { Check, Clock, Package, Truck } from 'lucide-react';

interface OrderTimelineProps {
  status: string;
}

export function OrderTimeline({ status }: OrderTimelineProps) {
  const steps = [
    { key: 'PENDING', label: 'Order Placed', icon: <Clock className="w-5 h-5" /> },
    { key: 'PROCESSING', label: 'Processing', icon: <Package className="w-5 h-5" /> },
    { key: 'SHIPPED', label: 'Shipped', icon: <Truck className="w-5 h-5" /> },
    { key: 'COMPLETED', label: 'Delivered', icon: <Check className="w-5 h-5" /> },
  ];

  let currentStepIndex = 0;
  if (status === 'PROCESSING') currentStepIndex = 1;
  if (status === 'SHIPPED') currentStepIndex = 2;
  if (status === 'COMPLETED') currentStepIndex = 3;

  if (status === 'CANCELLED') {
    return (
      <div className="bg-red-50 border border-red-200 p-6 text-center rounded-lg">
        <p className="text-red-600 font-bold text-lg">This order has been cancelled.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />
        
        {/* Active Progress Bar */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-[var(--color-brand-burgundy)] -translate-y-1/2 transition-all duration-500 ease-in-out" 
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors duration-500 ${
                    isCompleted 
                      ? 'bg-[var(--color-brand-burgundy)] text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {step.icon}
                </div>
                <div className="mt-3 text-center">
                  <p className={`text-xs font-bold uppercase tracking-wider ${
                    isCurrent ? 'text-[var(--color-brand-dark)]' : 
                    isCompleted ? 'text-[var(--color-brand-burgundy)]' : 
                    'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
