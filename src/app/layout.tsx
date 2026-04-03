import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";
import ToastContainer from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inovate - Automation eCommerce",
  description: "Your hub for premium smart automation technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen selection:bg-teal-500/30 selection:text-teal-200 antialiased`}
      >
        {children}
        <CartDrawer />
        <ToastContainer />
      </body>
    </html>
  );
}
