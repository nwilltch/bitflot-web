"use client";

import { useState } from "react";
import { Navbar } from "@/components/agence-dieppe/navbar";
import { Footer } from "@/components/agence-dieppe/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setIsSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Ajout de la date actuelle
    data.date = new Date().toLocaleString("fr-CA");

    try {
      // Nous utiliserons une variable d'environnement pour l'URL du script
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error("L'URL du script Google n'est pas configurée.");
      }

      const resp = await fetch(scriptUrl, {
        method: "POST",
        // Utiliser text/plain pour éviter la pré-vérification CORS (options) de Google
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      
      const result = await resp.json();
      
      if (result.status === "success" || result.result === "success") {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setErrorMessage("Erreur serveur lors de l'enregistrement de la demande.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Problème de connexion. Veuillez réessayer plus tard ou nous contacter directement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 px-6 md:px-12">
      <Navbar />
      <div className="container mx-auto max-w-7xl mt-16 relative z-10 flex-grow mb-20">
        
        <div className="flex flex-col flex-start mb-16 text-left">
          <p className="text-xl text-slate-300 font-light mb-6 tracking-wide">
            # Au plus près de vous
          </p>
          <div className="relative rotate-1 transition-transform hover:-rotate-1 duration-300 mb-6 inline-block self-start">
            <div className="bg-white text-black px-10 py-4 font-bold text-4xl md:text-6xl shadow-[6px_6px_0_rgba(100,100,100,0.5)] transform -skew-x-2">
              Contact.
            </div>
            <div className="absolute top-0 right-0 border-[20px] border-solid border-t-slate-300 border-r-slate-300 border-b-transparent border-l-transparent"></div>
          </div>
          <p className="text-2xl font-bold text-[#ffc107] max-w-3xl mt-4">
            Transformons vos ambitions en réalisations robustes.
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mt-4">
            Notre équipe d'ingénierie et de design est prête à évaluer votre projet, comprendre vos contraintes et vous proposer une architecture technique viable et budgétisée.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-8">Informations de contact</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ffc107]/20 text-[#ffc107] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Siège Social</h4>
                    <p className="text-slate-400">Dieppe, NB<br/>Canada</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#48dbfb]/20 text-[#48dbfb] flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Ligne Directe</h4>
                    <p className="text-slate-400">+1 (506) 899 6795</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ff6b6b]/20 text-[#ff6b6b] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Courriel Électronique</h4>
                    <p className="text-slate-400">hello@bitflot.dev</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Heures d'Ouverture</h4>
                    <p className="text-slate-400">Lun - Ven : 08h00 - 18h00 AST<br/>Samedi & Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0d6efd]/10 to-[#48dbfb]/10 border border-[#48dbfb]/20">
              <h4 className="text-lg font-bold text-white mb-2">Support Prioritaire 24/7</h4>
              <p className="text-slate-400 text-sm">Les clients sous contrat de maintenance bénéficient d'un SLA garanti et d'une ligne d'urgence joignable jour et nuit.</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden">
              {/* Decorative gradient orb */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0d6efd] opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
              
              <h3 className="text-3xl font-bold text-white mb-2 relative z-10">Lancer une requête</h3>
              <p className="text-slate-400 mb-8 relative z-10">Remplissez ce formulaire d'évaluation approfondie. Un architecte logiciel évaluera votre demande et vous recontactera sous 24h ouvrables.</p>
              
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Nom Complet *</label>
                    <input 
                      type="text" 
                      name="nom"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#48dbfb] transition-all"
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Entreprise / Organisation</label>
                    <input 
                      type="text" 
                      name="entreprise"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#48dbfb] transition-all"
                      placeholder="Groupe Dupont Inc."
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Adresse Courriel Professionnelle *</label>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#48dbfb] transition-all"
                      placeholder="jean@dupont.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Numéro de Téléphone</label>
                    <input 
                      type="tel" 
                      name="telephone"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#48dbfb] transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Type de Service Recherché *</label>
                  <select 
                    defaultValue=""
                    name="service"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#48dbfb] transition-all appearance-none"
                    required
                  >
                    <option value="" disabled>Sélectionnez une spécialité...</option>
                    <option value="web">Développement Web & E-commerce</option>
                    <option value="mobile">Création d'Application Mobile (iOS/Android)</option>
                    <option value="saas">Développement Logiciel SaaS Sur Mesure</option>
                    <option value="audit">Audit Technique & Cybersécurité</option>
                    <option value="autre">Autre Demande Technique</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Détails Quantitatifs du Projet *</label>
                  <textarea 
                    rows={6}
                    name="details"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#48dbfb] transition-all"
                    placeholder="Veuillez décrire vos objectifs, le contexte technique actuel, les échéanciers souhaités et toute information pertinente pour une évaluation précise..."
                    required
                  />
                </div>
                
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium text-center">
                    {errorMessage}
                  </div>
                )}
                
                {isSuccess && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Votre demande a été envoyée avec succès. Nous vous contacterons très bientôt.
                  </div>
                )}
                
                <div className="pt-2">
                  <Button disabled={isSubmitting} type="submit" className="w-full bg-[#ffc107] hover:bg-[#e6a800] text-black font-extrabold text-lg py-7 rounded-xl transition-transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(255,193,7,0.3)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none">
                    {isSubmitting ? (
                      <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Envoi en cours...</>
                    ) : (
                      "Soumettre la demande d'évaluation"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-500 text-center mt-4">
                  Vos données sont sécurisées et soumises à la plus stricte confidentialité, conformément à notre politique de protection des données d'entreprise.
                </p>
              </form>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
