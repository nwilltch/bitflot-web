import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] bg-egg-yolk/10 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" 
                alt="Notre Équipe" 
                className="w-full h-full object-cover"
              />
              {/* Overlay with stats like in the image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                 <div className="flex items-center gap-4 mb-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                      ))}
                    </div>
                    <span className="text-sm font-bold">4.9/5 Rating</span>
                 </div>
                 <p className="text-xs text-slate-500">Basé sur nos nombreux avis clients satisfaits.</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-egg-yolk rounded-full -z-10 opacity-20" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 text-egg-yolk font-bold text-sm uppercase tracking-wider mb-4">
              À Propos de Nous
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Portés par l'Innovation. <br />
              Animés par l'Humain.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Avec des années d'expérience dans le développement SaaS, l'architecture cloud et les services IT d'entreprise, nous aidons les entreprises à s'adapter techniquement et à prospérer dans un monde numérique.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                "Solutions sur mesure",
                "Équipes hautement qualifiées",
                "Support local 24/7",
                "Architecture sécurisée"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-egg-yolk" />
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100">
              <div>
                <div className="text-4xl font-bold text-slate-900">90%</div>
                <div className="text-sm text-slate-500">Satisfaction client</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900">180+</div>
                <div className="text-sm text-slate-500">Projets réussis</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900">10K+</div>
                <div className="text-sm text-slate-500">Heures de code</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
