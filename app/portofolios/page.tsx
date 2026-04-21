"use client";

import { Navbar } from "@/components/agence-dieppe/navbar";
import { Footer } from "@/components/agence-dieppe/footer";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function PortofolioPage() {
  const projects = [
    { 
      tag: "Géolocalisation / SaaS", 
      title: "Iziloc.app", 
      desc: "Système d'adressage universel permettant de localiser n'importe quel point précis, même sans nom de rue. Une solution innovante pour l'inclusion logistique et citoyenne.",
      image: "/portfolio/iziloc_landing.png"
    },
    { 
      tag: "Gaming / Multijoueur", 
      title: "Hanghoot.com", 
      desc: "Un jeu de mots multijoueur addictif qui transforme le vocabulaire en un outil de survie. Développé par Bitflot avec une stack moderne pour une expérience web fluide et sociale.",
      image: "/portfolio/hanghoot_landing.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pt-24 px-6 md:px-12">
      <Navbar />
      <div className="container mx-auto max-w-7xl mt-16 relative z-10 flex-grow mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative">
          
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-5 flex flex-col xl:sticky xl:top-36 h-fit bg-background/50 backdrop-blur-sm z-20 pb-4">
            <p className="text-xl text-slate-300 font-light mb-6 tracking-wide">
              # Au delà du code
            </p>
            <div className="relative rotate-2 transition-transform hover:rotate-1 duration-300 mb-8 self-start">
              <div className="bg-[#ffc107] text-black px-8 py-4 font-bold text-4xl lg:text-5xl shadow-[6px_6px_0_rgba(0,0,0,0.5)] transform skew-x-2">
                Le Portofolio.
              </div>
              <div className="absolute top-0 right-0 border-[20px] border-solid border-t-white border-r-white border-b-transparent border-l-transparent"></div>
              <div className="absolute -top-10 right-[-30px] text-3xl animate-bounce" style={{animationDuration: '3.5s'}}>🏆</div>
            </div>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed mt-4">
              Découvrez comment nous avons transformé des défis d'affaires complexes en produits digitaux évolutifs, élégants et générateurs de revenus pour nos partenaires de l'Acadie et d'ailleurs.
            </p>
          </div>
          
          {/* Right Column: Inner 2x2 Grid Carousel/Scroll */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:max-h-[75vh] overflow-y-auto premium-scrollbar pr-4 pb-20">
              {projects.map((project, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 aspect-[4/5] cursor-pointer">
                  
                  {/* Project Image or Background gradient */}
                  {project.image ? (
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover object-top opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 transition-transform duration-700 group-hover:scale-105"></div>
                  )}
                  
                  {/* Overlay shadow for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-8 z-10 transition-colors duration-500 group-hover:from-black">
                    
                    <div className="flex flex-col h-full justify-end">
                      <div className="transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                        <span className="inline-block px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-4 tracking-wider uppercase border border-white/10">
                          {project.tag}
                        </span>
                        <h3 className="text-2xl font-extrabold text-white mb-3">
                          {project.title}
                        </h3>
                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                          <p className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed text-sm mt-2">
                            {project.desc}
                          </p>
                        </div>
                      </div>
                      
                      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#48dbfb]/20 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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

