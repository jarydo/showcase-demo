import type { Metadata } from "next";
import { NeueMontreal } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Me Channel Finale yay!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NeueMontreal.variable} antialiased`}>{children}</body>
    </html>
  );
}
