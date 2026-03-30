"use client";
import { CookiesProvider } from "react-cookie";
import { CartProvider } from "../context/CartContext";
import { LikedProvider } from "../context/LikedContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <CartProvider>
        <LikedProvider>{children}</LikedProvider>
      </CartProvider>
    </CookiesProvider>
  );
}
