import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import "@fontsource/montserrat";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner/Spinner";

export const metadata: Metadata = {
  title: {
    template: "Products Cart App",
    default: "Home - Products Cart App",
  },
  description: "A virtual store for products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className} >
        <Suspense fallback={<Spinner />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
