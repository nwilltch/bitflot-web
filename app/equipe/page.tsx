"use client";

import { Navbar } from "@/components/agence-dieppe/navbar";
import { Footer } from "@/components/agence-dieppe/footer";
import { Linkedin, Github, Twitter } from "lucide-react";

export default function EquipePage() {
  return (
    <div className="min-h-screen flex flex-col pt-24 px-6">
      <Navbar />
      <div className="container mx-auto max-w-7xl mt-16 relative z-10 flex-grow mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative">
          
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-5 flex flex-col xl:sticky xl:top-36 h-fit bg-background/50 backdrop-blur-sm z-20 pb-4">
            <p className="text-xl text-slate-300 font-light mb-6 tracking-wide">
              # Notre Force
            </p>
            <div className="relative -rotate-2 transition-transform hover:-rotate-1 duration-300 mb-8 self-start">
              <div className="bg-[#48dbfb] text-black px-10 py-4 font-bold text-4xl lg:text-5xl shadow-[6px_6px_0_rgba(0,0,0,0.5)] transform -skew-x-2">
                L'Equipe.
              </div>
              <div className="absolute top-0 right-0 border-[20px] border-solid border-t-white border-r-white border-b-transparent border-l-transparent"></div>
              <div className="absolute -bottom-8 right-[-30px] text-3xl animate-bounce" style={{animationDuration: '2.5s'}}>✨</div>
            </div>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed mt-4">
              Une synergie unique de talents spécialisés, rassemblant ingénieurs chevronnés, designers inspirés et stratèges du numérique pour transformer vos visions en réalité technique et commerciale.
            </p>
          </div>
          
          {/* Right Column: Inner 2x2 Grid Carousel/Scroll */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:max-h-[75vh] overflow-y-auto premium-scrollbar pr-4 pb-20">
              {[
                { 
                  name: "William Tchatat", 
                  role: "Dev +10, AI & Cybersecurity", 
                  desc: "Plus de 10 ans d'expertise en ingénierie logicielle. Pilote l'architecture des systèmes, l'intégration de l'Intelligence Artificielle et assure la cybersécurité des projets.",
                  img: "https://media.licdn.com/dms/image/v2/D4E03AQGvheGettAsOg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1703538601373?e=1778112000&v=beta&t=MPafhBG3JrUIFnoee_M3fi6v4v8fzXd7HPsZXIpjhzk" 
                },
                { 
                  name: "Mathieu Roy", 
                  role: "Lead Développeur", 
                  desc: "Expert en développement d'applications robustes. Spécialisé dans la conception d'interfaces fluides et l'optimisation des performances techniques.",
                  img: "/mathieu.png" 
                }
              ].map((member, i) => (
                <div key={i} className="group rounded-3xl bg-white/5 border border-white/10 hover:border-[#ffc107]/50 hover:bg-white/10 transition-all p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                  {/* Decorative background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#ffc107]/0 to-[#ffc107]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="w-24 h-24 mx-auto rounded-full bg-slate-800 mb-4 overflow-hidden border-4 border-white/10 group-hover:border-[#ffc107]/80 transition-colors z-10 relative shadow-2xl shrink-0">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover filter group-hover:brightness-110 transition-all duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 z-10">{member.name}</h3>
                  <p className="text-[#ffc107] font-medium text-xs mb-3 z-10 uppercase tracking-wider">{member.role}</p>
                  <p className="text-sm text-slate-400 mb-6 flex-grow z-10 leading-relaxed max-w-xs">{member.desc}</p>
                  
                  <div className="flex gap-3 mt-auto z-10">
                    <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-600 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
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
