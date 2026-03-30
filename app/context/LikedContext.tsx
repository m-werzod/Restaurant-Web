"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CartProduct } from "./CartContext";

type LikedContextType = {
  likedItems: CartProduct[];
  toggleLiked: (product: CartProduct) => void;
  isLiked: (id: number) => boolean;
  likedCount: number;
};

const LikedContext = createContext<LikedContextType | null>(null);

export function LikedProvider({ children }: { children: React.ReactNode }) {
  const [likedItems, setLikedItems] = useState<CartProduct[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("restaurant_liked");
      if (stored) setLikedItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("restaurant_liked", JSON.stringify(likedItems));
  }, [likedItems]);

  const toggleLiked = (product: CartProduct) => {
    setLikedItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [...prev, product];
    });
  };

  const isLiked = (id: number) => likedItems.some((i) => i.id === id);

  return (
    <LikedContext.Provider
      value={{ likedItems, toggleLiked, isLiked, likedCount: likedItems.length }}
    >
      {children}
    </LikedContext.Provider>
  );
}

export function useLiked() {
  const ctx = useContext(LikedContext);
  if (!ctx) throw new Error("useLiked must be used within LikedProvider");
  return ctx;
}
