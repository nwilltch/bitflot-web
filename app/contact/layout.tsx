import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez-nous | Diagnostic PME",
  description: "Planifiez un diagnostic gratuit de vos infrastructures web, outils de cybersécurité et processus manuels pour votre PME au Nouveau-Brunswick.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
