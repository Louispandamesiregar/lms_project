import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-background w-full">
      <div className="flex flex-col items-center gap-8 border-4 border-border bg-card p-12 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] animate-in fade-in zoom-in duration-500">
        
        {/* Rolling Logo Animation */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
          <Image 
            src="/logo_artretro.png" 
            alt="Loading..." 
            fill 
            className="object-cover animate-[spin_2s_linear_infinite]" 
            priority
          />
        </div>

        {/* Retro Loading Text */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-primary animate-pulse">
            Memuat
          </h2>
          <div className="flex gap-1 mt-2">
            <span className="w-3 h-3 bg-secondary rounded-full border-2 border-border animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-3 h-3 bg-destructive rounded-full border-2 border-border animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-3 h-3 bg-primary rounded-full border-2 border-border animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>

      </div>
    </div>
  );
}
