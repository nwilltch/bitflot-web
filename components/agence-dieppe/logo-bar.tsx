export function LogoBar() {
  const logos = ["AC Smith", "Abbvie", "Catalent", "AXON", "Amazon", "Celanese"];
  
  return (
    <div className="w-full py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale">
          {logos.map((logo) => (
            <span key={logo} className="text-xl font-bold text-slate-900 tracking-widest">{logo}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
