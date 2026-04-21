"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-white/5" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            {/* Custom logo as seen in dark mode image */}
            <div className="relative w-7 h-7 bg-[#ffc107] rounded-full flex items-center justify-center shrink-0">
              <div className="w-3 h-3 bg-[#0d6efd] rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white mb-0.5">bitflot</span>
          </Link>
          
          <div className="hidden xl:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/portofolios" className="hover:text-white transition-colors">Portofolios</Link>
            <Link href="/equipe" className="hover:text-white transition-colors">Equipe</Link>
            <Link href="/#apropos" className="hover:text-white transition-colors">À propos</Link>
          </div>

          <div className="hidden xl:flex items-center gap-6">
            <Link href="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Contact</Link>
            <Button asChild className="bg-[#48dbfb] hover:bg-[#3bc2e3] text-black font-bold rounded-full px-6 transition-all hover:scale-105 shadow-[0_0_15px_rgba(72,219,251,0.2)]">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Diagnostic gratuit
              </Link>
            </Button>
          </div>

          <div className="xl:hidden flex items-center gap-4">
            <Button asChild className="hidden sm:inline-flex bg-[#48dbfb] hover:bg-[#3bc2e3] text-black font-bold rounded-full px-4 text-xs transition-all">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Diagnostic
              </Link>
            </Button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white hover:text-[#ffc107] transition-colors p-2"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-[#060b19] z-[60] flex flex-col p-6 transition-transform duration-300 ease-in-out xl:hidden overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-8 h-8 bg-[#ffc107] rounded-full flex items-center justify-center shrink-0">
              <div className="w-3.5 h-3.5 bg-[#0d6efd] rounded-full"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white mb-0.5">bitflot</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-400 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col gap-6 text-2xl sm:text-3xl font-bold mt-4">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#ffc107] transition-colors border-b border-white/10 pb-4">Accueil</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#ffc107] transition-colors border-b border-white/10 pb-4">Services</Link>
          <Link href="/portofolios" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#ffc107] transition-colors border-b border-white/10 pb-4">Portofolios</Link>
          <Link href="/equipe" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#ffc107] transition-colors border-b border-white/10 pb-4">Equipe</Link>
          <Link href="/#apropos" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#ffc107] transition-colors border-b border-white/10 pb-4">À propos</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#ff6b6b] transition-colors border-b border-white/10 pb-4">Contact</Link>
        </div>
        
        <div className="mt-8">
          <Button asChild className="w-full bg-[#48dbfb] text-black font-extrabold text-lg py-6 rounded-xl hover:bg-[#3bc2e3] transition-all">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Planifier un diagnostic gratuit
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
