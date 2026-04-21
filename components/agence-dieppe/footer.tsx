"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Send, Loader2, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setErrorMessage("");
    setIsSuccess(false);

    const data = {
      email: email,
      service: "Newsletter", // Use the "service" column to denote the origin
      date: new Date().toLocaleString("fr-CA")
    };

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) {
        throw new Error("L'URL du script Google n'est pas configurée.");
      }

      const resp = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      
      const result = await resp.json();
      
      if (result.status === "success" || result.result === "success") {
        setIsSuccess(true);
        setEmail("");
      } else {
        setErrorMessage("Erreur d'inscription.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Problème de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background border-t border-white/5 text-white pt-24 pb-12 mt-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8 bg-[#ffc107] rounded-full flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-[#0d6efd] rounded-full"></div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white mb-1">bitflot</span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              L'agence dev au cœur de l'Acadie. Nous créons des expériences digitales exceptionnelles et des solutions logicielles sur mesure.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ffc107] hover:text-black hover:border-[#ffc107] transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-white/50">Contact & Zone</h4>
            <ul className="space-y-4">
              <li className="text-slate-400">
                <strong className="text-[#ffc107]">Zone couverte :</strong><br />
                Dieppe & Grand Moncton (NB)
              </li>
              <li className="text-slate-400">
                <strong className="text-[#ff6b6b]">Email :</strong><br />
                hello@bitflot.dev
              </li>
              <li className="text-slate-400">
                <strong className="text-[#48dbfb]">Téléphone :</strong><br />
                +1 (506) 899 6795
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-white/50">Raccourcis</h4>
            <ul className="space-y-4">
              {[
                { name: "Services", href: "/services" },
                { name: "Cybersécurité", href: "/#cybersecurite" },
                { name: "Méthodologie", href: "/#methode" },
                { name: "À propos", href: "/#apropos" },
                { name: "Contact", href: "/contact" }
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-white/50">Newsletter</h4>
            <p className="text-slate-400 mb-6 text-sm">Recevez nos dernières actualités et insights technologiques.</p>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#48dbfb] transition-colors text-white text-sm pr-12"
                disabled={isSubmitting}
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="absolute right-1.5 top-1.5 w-9 h-9 bg-white text-black rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
            {isSuccess && (
              <p className="text-emerald-400 text-xs mt-3 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Inscrit avec succès !
              </p>
            )}
            {errorMessage && (
              <p className="text-red-400 text-xs mt-3">{errorMessage}</p>
            )}
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} bitflot.dev. Fait avec fierté. Tous droits réservés.
            </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">Confidentialité</Link>
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">Mentions Légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
