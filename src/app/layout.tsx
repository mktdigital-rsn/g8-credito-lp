import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";
import { brand } from "@/config/brand";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: `Empréstimo Pessoal | ${brand.name}`,
  description:
    "Crédito pessoal rápido, 100% online e sem burocracia. Preencha o formulário e solicite seu empréstimo com a G8.",};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
