import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Services Informatiques PME",
  description: "Développement web backend, Automatisation IA, Cybersécurité et sites web connectés pour les PME du Nouveau-Brunswick.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
