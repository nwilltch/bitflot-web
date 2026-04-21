"use client";

import { CheckCircle2, ShieldAlert, Zap, Lock, Code2, Globe2, AlertTriangle, ArrowRight, Server, FileSearch, ShieldCheck, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- 3. Problèmes des PME (Section empathie) ---
export function PainPointsSection() {
  const problems = [
    "Trop de tâches manuelles (Excel, emails, copier-coller)",
    "Données dispersées et mal protégées",
    "Outils qui ne communiquent pas entre eux",
    "Peur des cyberattaques et des pertes de données",
    "Sites web qui ne génèrent pas de valeur réelle"
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-xl text-slate-400 font-light mb-4"># La réalité du terrain</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl">
            Les défis numériques des <span className="text-[#ff6b6b]">PME</span> aujourd'hui
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:border-[#ff6b6b]/30 transition-colors">
              <div className="bg-[#ff6b6b]/10 p-3 rounded-xl shrink-0">
                <AlertTriangle className="w-6 h-6 text-[#ff6b6b]" />
              </div>
              <p className="text-slate-300 font-medium leading-relaxed">{prob}</p>
            </div>
          ))}
          <div className="bg-gradient-to-br from-[#ff6b6b]/10 to-transparent border border-[#ff6b6b]/20 p-6 rounded-2xl flex items-center justify-center lg:col-span-1">
             <p className="text-[#ff6b6b] font-bold text-lg text-center">Ça vous parle ?<br/>Nous avons la solution.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 4. Ta solution globale ---
export function GlobalSolutionSection() {
  return (
    <section className="py-24 relative border-y border-white/10 bg-slate-900/50">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#48dbfb]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Une approche complète : <br/><span className="text-[#48dbfb]">efficacité + sécurité</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-300">
              <p>Nous ne faisons pas que des "sites vitrines". Nous développons des <strong>outils sur mesure</strong> pensés pour centraliser vos opérations.</p>
              <p>Nous intégrons <strong>la sécurité dès la conception</strong> pour protéger vos données clients, et nous injectons de <strong>l'IA pragmatique</strong> uniquement quand elle apporte un gain de temps mesurable.</p>
              <p className="font-semibold text-white">Surtout : nous parlons un langage compréhensible. Fini le jargon technique inutile.</p>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="bg-black/50 p-6 border border-white/10 rounded-2xl aspect-square flex flex-col items-center justify-center text-center">
              <Settings className="w-10 h-10 text-white mb-4" />
              <span className="font-bold text-white">Sur-Mesure</span>
            </div>
            <div className="bg-[#48dbfb]/10 p-6 border border-[#48dbfb]/30 rounded-2xl aspect-square flex flex-col items-center justify-center text-center transform translate-y-8">
               <ShieldCheck className="w-10 h-10 text-[#48dbfb] mb-4" />
               <span className="font-bold text-[#48dbfb]">Security-First</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 5. Services ---
export function ServicesPreviewSection() {
  const services = [
    {
      icon: <Server className="w-8 h-8" />,
      color: "text-[#0d6efd]",
      bg: "bg-[#0d6efd]/10",
      border: "hover:border-[#0d6efd]/50",
      title: "Applications web backend sécurisées",
      desc: "Outils internes sur mesure, APIs et bases de données sécurisées avec gestion fine des permissions.",
      points: ["Moins d'erreurs", "Processus centralisés", "Meilleur contrôle des données"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      color: "text-[#ffc107]",
      bg: "bg-[#ffc107]/10",
      border: "hover:border-[#ffc107]/50",
      title: "Automatisation & IA pragmatique",
      desc: "Automatisation de flux (emails, formulaires) et IA interne (classification, résumé) sans exposer vos données.",
      points: ["Gain de temps", "Zéro tâche répétitive", "IA contrôlée"]
    },
    {
      icon: <ShieldAlert className="w-8 h-8" />,
      color: "text-[#ff6b6b]",
      bg: "bg-[#ff6b6b]/10",
      border: "hover:border-[#ff6b6b]/50",
      title: "Cybersécurité pour PME",
      desc: "Une protection compréhensible et adaptée. Bonnes pratiques backend & cloud pour contrer les fuites.",
      points: ["Protection des données", "Réduction des risques", "Audit & conformité"]
    },
    {
      icon: <Globe2 className="w-8 h-8" />,
      color: "text-[#48dbfb]",
      bg: "bg-[#48dbfb]/10",
      border: "hover:border-[#48dbfb]/50",
      title: "Sites web connectés et sécurisés",
      desc: "Des sites reliés à un backend avec formulaires sécurisés et suivi complet des leads.",
      points: ["Soutien opérationnel", "Génération de valeur", "Performance UX"]
    }
  ];

  return (
    <section className="py-24 relative" id="services">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Nos expertises</h2>
          <p className="text-xl text-slate-400 max-w-2xl">Clarté et crédibilité. Ce que nous faisons de mieux.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, i) => (
            <div key={i} className={`p-8 rounded-3xl bg-white/5 border border-white/10 ${svc.border} transition-colors group relative overflow-hidden`}>
              <div className={`${svc.bg} ${svc.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                {svc.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{svc.title}</h3>
              <p className="text-slate-400 mb-6 min-h-[50px]">{svc.desc}</p>
              <ul className="space-y-2 mt-auto border-t border-white/10 pt-6">
                {svc.points.map((pt, j) => (
                  <li key={j} className="flex gap-2 items-center text-sm font-medium text-slate-300">
                    <CheckCircle2 className={`w-4 h-4 ${svc.color}`} /> {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 6. Offres / Packages ---
export function OffersSection() {
  const packages = [
    {
      title: "Diagnostic numérique & sécurité",
      color: "text-white",
      bg: "bg-slate-800",
      points: ["Analyse des outils", "Identification des risques", "Plan d'amélioration priorisé"],
      cta: "Demander un diagnostic"
    },
    {
      title: "Solution web sur mesure",
      color: "text-[#ffc107]",
      bg: "bg-slate-900",
      border: "border-[#ffc107]/50",
      badge: "Recommandé",
      points: ["Développement backend", "Sécurité intégrée", "Déploiement + formation"],
      cta: "Discuter de mon projet"
    },
    {
      title: "Support & sécurité continue",
      color: "text-[#48dbfb]",
      bg: "bg-slate-800",
      points: ["Mises à jour", "Surveillance", "Améliorations continues"],
      cta: "Voir le suivi mensuel"
    }
  ];

  return (
    <section className="py-24 bg-black relative border-y border-white/10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Packs d'intervention</h2>
          <p className="text-xl text-slate-400">Pour faciliter votre décision technique.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div key={i} className={`relative p-8 rounded-3xl ${pkg.bg} border ${pkg.border ? pkg.border : 'border-white/10'} flex flex-col`}>
              {pkg.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ffc107] text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  {pkg.badge}
                </span>
              )}
              <h3 className={`text-2xl font-bold mb-8 h-16 ${pkg.color}`}>{pkg.title}</h3>
              <ul className="space-y-4 mb-10 flex-grow">
                {pkg.points.map((pt, j) => (
                  <li key={j} className="flex gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 shrink-0 opacity-50" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full bg-white text-black hover:bg-slate-200 font-bold rounded-xl py-6">
                <Link href="/contact">{pkg.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 7. Méthode de travail ---
export function MethodologySection() {
  const steps = [
    { n: "01", title: "Analyse & diagnostic" },
    { n: "02", title: "Conception sécurisée" },
    { n: "03", title: "Développement sur mesure" },
    { n: "04", title: "Tests & validation" },
    { n: "05", title: "Déploiement & accompagnement" },
  ];

  return (
    <section className="py-24" id="methode">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Notre Méthode</h2>
          <p className="text-xl text-slate-400">Pour rassurer et professionnaliser votre transition.</p>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="text-3xl font-black text-white/20">{step.n}</div>
              <div className="text-xl font-bold text-white">{step.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 8 & 9. Pourquoi nous & À propos ---
export function AboutPreviewSection() {
  return (
    <section className="py-24 bg-slate-900 border-t border-white/10" id="apropos">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pourquoi nous choisir ?</h2>
            <ul className="space-y-4 mb-12">
              {[
                "Local et bilingue",
                "Expertise backend + IA + cybersécurité",
                "Approche simple et orientée résultats",
                "Pas de jargon inutile",
                "Partenaire long terme pour PME"
              ].map((reason, i) => (
                <li key={i} className="flex gap-4 items-center bg-black/30 p-4 rounded-xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#48dbfb]"></div>
                  <span className="text-white font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-5 bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-[#ffc107] mb-6">À propos</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Fondée sur une expertise pointue en ingénierie, notre agence est ancrée localement à Dieppe et au Nouveau-Brunswick pour servir nos PME canadiennes.
            </p>
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-slate-500 uppercase tracking-widest mb-4">Nos valeurs</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold">Fiabilité</span>
                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold">Sécurité</span>
                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold">Simplicité</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 10. CTA Final ---
export function FinalCtaSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#48dbfb]/10"></div>
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
          Vous voulez sécuriser et optimiser vos outils numériques ?
        </h2>
        <Button asChild className="bg-[#48dbfb] hover:bg-[#3bc2e3] text-black rounded-full px-10 py-8 text-xl font-extrabold transition-all hover:scale-105 shadow-[0_0_40px_rgba(72,219,251,0.3)]">
          <Link href="/contact">
            Planifier un diagnostic gratuit
          </Link>
        </Button>
      </div>
    </section>
  );
}
