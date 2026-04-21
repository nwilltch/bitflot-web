import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Portfolios et Réalisations",
  description: "Découvrez les projets technologiques (applications web, SaaS, intégration IA) réalisés pour nos partenaires d'affaires.",
};

export default function PortofoliosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
