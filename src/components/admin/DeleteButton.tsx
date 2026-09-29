"use client";

import React from "react";

export function DeleteButton() {
  return (
    <button 
      type="submit" 
      className="text-red-600 hover:underline font-bold text-xs"
      onClick={(e) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
          e.preventDefault();
        }
      }}
    >
      Delete
    </button>
  );
}
