"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-24 overflow-hidden px-6">
      
      {/* Decorative Wave Line SVG */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-30 select-none pointer-events-none -z-10">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 100C300 150 500 50 720 100C940 150 1140 50 1440 100" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto max-w-5xl flex flex-col items-center text-center relative z-10 mb-10 pt-10">
        
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
          {/* Innovation Tag */}
          <div className="relative rotate-[-3deg] transition-transform hover:rotate-[-1deg] duration-300">
            <div className="bg-[#ff6b6b] text-black px-6 py-2 font-bold text-lg md:text-xl shadow-[4px_4px_0_rgba(0,0,0,0.5)] transform -skew-x-2">
              Dieppe / Grand Moncton.
            </div>
            <div className="absolute top-0 right-0 border-[8px] md:border-[10px] border-solid border-t-white border-r-white border-b-transparent border-l-transparent"></div>
          </div>
          
          {/* Digitale Tag */}
          <div className="relative rotate-[3deg] transition-transform hover:rotate-[1deg] duration-300 mt-2 md:mt-0">
            <div className="bg-[#48dbfb] text-black px-6 py-2 font-bold text-lg md:text-xl shadow-[4px_4px_0_rgba(0,0,0,0.5)] transform skew-x-2">
              Pour PME Locales.
            </div>
            <div className="absolute top-0 right-0 border-[8px] md:border-[10px] border-solid border-t-white border-r-white border-b-transparent border-l-transparent"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tight text-white mb-8 leading-[1.1] max-w-5xl">
          Solutions web, <span className="text-[#ffc107]">IA</span> et <span className="text-[#48dbfb]">cybersécurité</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-medium">
          Nous aidons les PME de Dieppe et du Grand Moncton à automatiser, sécuriser et structurer leurs opérations grâce à des outils numériques sur mesure.
        </p>

        {/* Bullets de valeur */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-x-8 md:gap-y-4 mb-16">
          {[
            "Automatisation des tâches manuelles",
            "Applications web backend sécurisées",
            "IA utile, simple et contrôlée",
            "Cybersécurité adaptée aux PME"
          ].map((bullet, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-[#48dbfb]" />
              <span className="text-sm font-medium text-slate-200">{bullet}</span>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-12 left-0 right-0 w-full flex flex-col items-center justify-center gap-4 z-20 px-6">
        <Button asChild className="bg-[#ffc107] hover:bg-[#e6a800] text-black rounded-full px-8 py-7 text-lg font-extrabold transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(255,193,7,0.3)]">
          <Link href="/contact">
            Planifier un diagnostic
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
        <span className="text-slate-400 text-sm font-medium">Sans engagement. Rendu en 48h.</span>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-[20%] left-[10%] text-3xl animate-bounce pointer-events-none hidden md:block" style={{animationDuration: '3s'}}>🛡️</div>
      <div className="absolute top-[30%] right-[12%] text-4xl animate-bounce pointer-events-none hidden md:block" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>🧠</div>
      <div className="absolute bottom-[25%] left-[15%] text-2xl animate-bounce pointer-events-none hidden md:block" style={{animationDuration: '2.5s', animationDelay: '1s'}}>⚙️</div>

    </section>
  );
}
