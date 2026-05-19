import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ApolloProvider from "@/components/providers/ApolloProvider";
import Navbar from "@/components/layout/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Rick & Morty Explorer",
  description: "Browse Rick and Morty characters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-900 text-white antialiased">
        <ApolloProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </ApolloProvider>
      </body>
    </html>
  );
}
