import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Portfolio() {
  const projects = [
    {
      title: "Site Web Entreprise de Construction",
      category: "Développement Web",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Site Agence de Conseil",
      category: "UI/UX & Développement",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Application de Gestion Hospitalière",
      category: "SaaS / Santé",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-egg-yolk font-bold text-sm uppercase tracking-wider mb-4">
            Showcase de nos projets
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Études de cas & <br />Histoires de Succès
          </h2>
          <p className="text-lg text-slate-500">
            Nous construisons des solutions qui livrent des résultats. Voici une sélection de nos projets les plus marquants.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden mb-6 relative">
                 <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Plus className="h-8 w-8 text-egg-yolk" />
                    </div>
                 </div>
              </div>
              <div className="text-sm font-bold text-egg-yolk mb-2">{project.category}</div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-egg-yolk transition-colors">{project.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
           <Button variant="outline" className="rounded-full px-10 h-14 border-2 text-lg">
             Voir tout le portfolio
           </Button>
        </div>
      </div>
    </section>
  );
}
