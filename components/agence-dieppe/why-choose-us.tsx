import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export function WhyChooseUs() {
  const [openIndex, setOpenIndex] = useState(0);

  const reasons = [
    {
      title: "Solutions sur Mesure",
      content: "Nous ne croyons pas aux solutions toutes faites. Chaque système que nous codons est personnalisé pour vos objectifs uniques, vos flux de travail et vos défis."
    },
    {
      title: "Évolutif et Prêt pour le Futur",
      content: "Nos architectures sont conçues pour croître avec votre entreprise, garantissant que vos investissements technologiques restent pertinents demain."
    },
    {
      title: "Approche Centrée sur le Client",
      content: "Votre succès est notre priorité. Nous travaillons en étroite collaboration avec vous à chaque étape du processus de développement."
    },
    {
      title: "Sécurité et Conformité d'abord",
      content: "Nous intégrons la sécurité dans l'ADN de nos produits pour protéger vos données et celles de vos clients."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-egg-yolk font-bold text-sm uppercase tracking-wider mb-4">
              Pourquoi nous choisir
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">
              Bâti sur la Confiance, <br />
              Propulsé par les Résultats
            </h2>

            <div className="space-y-4">
              {reasons.map((reason, i) => (
                <div 
                  key={i} 
                  className={`border-b border-slate-100 last:border-0 pb-4 transition-all duration-300`}
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    className="flex items-center justify-between w-full text-left py-4 group"
                  >
                    <span className={`text-xl font-bold transition-colors ${openIndex === i ? 'text-egg-yolk' : 'text-slate-900 group-hover:text-egg-yolk'}`}>
                      {reason.title}
                    </span>
                    {openIndex === i ? (
                      <Minus className="h-5 w-5 text-egg-yolk" />
                    ) : (
                      <Plus className="h-5 w-5 text-slate-400 group-hover:text-egg-yolk" />
                    )}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-600 pb-4 pr-12">
                      {reason.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="aspect-square rounded-[40px] bg-slate-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Team Collaboration" 
                  className="w-full h-full object-cover"
                />
             </div>
             {/* Decorative element like in the image */}
             <div className="absolute -bottom-8 -left-8 bg-egg-yolk p-8 rounded-3xl hidden md:block">
                <div className="text-4xl font-bold text-white mb-1">10+</div>
                <div className="text-sm font-medium text-white/80">Années d'excellence IT</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
