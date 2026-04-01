"use client";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { resolveMediaUrl } from "@/lib/media";

const API_BASE = "https://anorkhulov.uz";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const token = cookies.token;
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/food`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(
            data.map((item: Product) => ({
              ...item,
              image: resolveMediaUrl(item.image, API_BASE),
            })),
          );
        } else if (Array.isArray(data?.data)) {
          setProducts(
            data.data.map((item: Product) => ({
              ...item,
              image: resolveMediaUrl(item.image, API_BASE),
            })),
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [cookies.token]);

  return { products, loading };
}
