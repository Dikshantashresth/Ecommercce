import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastContainer from "@/components/ui/Toast";
import EnquiryModal from "@/components/ui/EnquiryModal";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neuraforge - Automation eCommerce",
  description: "Your hub for premium smart automation technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 min-h-screen selection:bg-teal-500/30 selection:text-teal-200 antialiased transition-colors duration-200`}
      >
        <ThemeProvider>
          {children}
          <EnquiryModal />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
