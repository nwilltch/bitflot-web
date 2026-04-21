import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Bitflot | Solutions Web, IA & Cybersécurité pour PME",
    template: "%s | Agence Bitflot"
  },
  description: "Agence technologique partenaire des PME de Dieppe et du Grand Moncton. Nous développons des applications backend sécurisées, intégrons l'IA pragmatique et assurons votre cybersécurité.",
  keywords: ["agence web dieppe", "cybersécurité moncton", "développement informatique", "intégration IA PME", "applications sur mesure", "nouveau-brunswick technologique"],
  openGraph: {
    title: "Bitflot | Solutions Web, IA & Cybersécurité",
    description: "L'agence dev partenaire des PME au Nouveau-Brunswick. Automatisation, logiciels sur-mesure et sécurité des données.",
    url: "https://bitflot.dev",
    siteName: "Agence Bitflot",
    images: [
      {
        url: "https://bitflot.dev/og-image.jpg", // Default OG image path
        width: 1200,
        height: 630,
        alt: "Bitflot Agence Tech",
      },
    ],
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence Bitflot",
    description: "Solutions technologiques de pointe pour les PME.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" className="dark">
        <body className={cn(inter.className, "min-h-screen bg-background bg-dot-pattern font-sans antialiased text-foreground")}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
