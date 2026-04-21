import { Monitor, PieChart, Code2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServicesSection() {
  const services = [
    {
      title: "Services de Conseil IT",
      desc: "Orientation stratégique pour aligner votre pile technologique avec vos objectifs commerciaux à long terme.",
      icon: <Monitor className="h-8 w-8 text-egg-yolk" />,
      tag: "Conseil"
    },
    {
      title: "Solutions Data & Analytics",
      desc: "Transformez vos données brutes en informations exploitables qui stimulent les décisions intelligentes.",
      icon: <PieChart className="h-8 w-8 text-egg-yolk" />,
      tag: "Data"
    },
    {
      title: "Développement Web & App",
      desc: "Des sites web et applications réactifs et centrés sur l'utilisateur, construits avec les technologies modernes.",
      icon: <Code2 className="h-8 w-8 text-egg-yolk" />,
      tag: "Dév"
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-egg-yolk font-bold text-sm uppercase tracking-wider mb-4">
              Nos Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Des solutions conçues pour accélérer votre croissance
            </h2>
          </div>
          <Button variant="outline" className="rounded-full px-8 h-12 border-2 text-slate-600">
            Voir tout
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-egg-yolk/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-egg-yolk group-hover:scale-110 transition-all duration-300">
                {service.icon && (
                  <div className="group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {service.desc}
              </p>
              <button className="flex items-center gap-2 font-bold text-sm text-slate-900 hover:text-egg-yolk transition-colors uppercase tracking-widest">
                <Plus className="h-4 w-4" />
                Détails
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
