import type { Metadata } from "next";
import Providers from "@/app/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
