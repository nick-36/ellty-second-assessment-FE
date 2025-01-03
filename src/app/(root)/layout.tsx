import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/sidebar";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "500"] });

export const metadata: Metadata = {
  title: "Ellty Assessment",
  description: "Nested tree structure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <main className="flex flex-row">
          <Sidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
