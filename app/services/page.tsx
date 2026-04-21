"use client";

import { Navbar } from "@/components/agence-dieppe/navbar";
import { Footer } from "@/components/agence-dieppe/footer";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col pt-24 px-6">
      <Navbar />
      <div className="container mx-auto max-w-7xl mt-16 relative z-10 flex-grow mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative">
          
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-5 flex flex-col xl:sticky xl:top-36 h-fit bg-background/50 backdrop-blur-sm z-20 pb-4">
            <p className="text-xl text-slate-300 font-light mb-6 tracking-wide">
              # Notre Expertise
            </p>
            <div className="relative rotate-2 transition-transform hover:rotate-1 duration-300 mb-8 self-start">
              <div className="bg-[#ff6b6b] text-black px-8 py-4 font-bold text-4xl lg:text-5xl shadow-[6px_6px_0_rgba(0,0,0,0.5)] transform skew-x-2">
                Nos Services.
              </div>
              <div className="absolute top-0 right-0 border-[20px] border-solid border-t-white border-r-white border-b-transparent border-l-transparent"></div>
              <div className="absolute -top-10 left-[-20px] text-3xl animate-bounce" style={{animationDuration: '3s'}}>🚀</div>
            </div>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed mt-4">
              De la conception stratégique au déploiement technique, nous vous accompagnons sur l'ensemble du cycle de vie de votre projet avec une agilité et une qualité dignes des plus grandes entreprises.
            </p>
          </div>
          
          {/* Right Column: Inner 2x2 Grid Carousel/Scroll */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:max-h-[75vh] overflow-y-auto premium-scrollbar pr-4 pb-20">
              {[ 
                { 
                  name: "Applications web backend sécurisées", 
                  desc: "Outils internes sur mesure, APIs et bases de données sécurisées. La fondation solide pour digitaliser vos processus.",
                  points: ["Moins d'erreurs", "Processus centralisés", "Meilleur contrôle des données"]
                },
                { 
                  name: "Automatisation & IA pragmatique", 
                  desc: "Automatisation de flux (emails, formulaires) et IA interne (classification, résumé) conçue spécifiquement pour gagner du temps.",
                  points: ["Gain de temps massif", "Zéro tâche répétitive", "IA contrôlée & interne"]
                },
                { 
                  name: "Cybersécurité pour PME", 
                  desc: "Une sécurité compréhensible, adaptée à votre taille. Bonnes pratiques de code, protection des serveurs et réduction des risques de fuites.",
                  points: ["Protection des données", "Réduction des risques", "Audit & bonnes pratiques"]
                },
                { 
                  name: "Sites web connectés et sécurisés", 
                  desc: "Bien plus qu'une vitrine. Un site qui soutient vos opérations, relié à un backend robuste avec formulaires sécurisés et suivi des leads.",
                  points: ["Soutien opérationnel", "Génération de valeur", "Sur-mesure"]
                }
              ].map((service, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md group relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffc107] to-[#0d6efd] mb-6 flex items-center justify-center text-white text-xl font-black shadow-lg shrink-0">
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-4 leading-tight group-hover:text-[#48dbfb] transition-colors pr-2">{service.name}</h3>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-grow">{service.desc}</p>
                  <ul className="space-y-2 border-t border-white/10 pt-4 mt-auto">
                    {service.points.map((point, j) => (
                      <li key={j} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#ff6b6b] shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
