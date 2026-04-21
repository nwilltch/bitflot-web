import { Metadata } from "next";

export const metadata: Metadata = {
  title: "L'Équipe Bitflot",
  description: "Rencontrez l'équipe d'experts en ingénierie logicielle, cybersécurité et intelligence artificielle basée à Dieppe, NB.",
};

export default function EquipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
