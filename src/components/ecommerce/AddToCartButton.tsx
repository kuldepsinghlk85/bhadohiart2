"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    slug?: string;
  };
  size?: string;
  variant?: "default" | "outline";
}

export function AddToCartButton({ product, size, variant = "default" }: AddToCartButtonProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: size || 'Standard',
      slug: product.slug,
    });
  };

  return (
    <Button 
      size="lg" 
      className="flex-1" 
      variant={variant}
      onClick={handleAddToCart}
    >
      ADD TO CART
    </Button>
  );
}
