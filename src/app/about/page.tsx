import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground border-b-4 border-border py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">Tentang Kami</h1>
          <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto">
            Membawa kembali kejayaan seni dengan sentuhan modern.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 w-full space-y-16">
        <section className="space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tight border-b-4 border-border inline-block pb-2">Visi Kami</h2>
          <p className="text-xl font-medium leading-relaxed">
            Di <strong>ArtRetro LMS</strong>, kami percaya bahwa seni tidak pernah mati. Ia hanya berevolusi. 
            Misi kami adalah menyediakan wadah bagi para seniman, baik pemula maupun profesional, untuk belajar, 
            berbagi, dan berkembang bersama menggunakan metodologi pembelajaran retro yang abadi dipadukan dengan 
            teknologi modern masa kini.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-4xl font-black uppercase tracking-tight border-b-4 border-border inline-block pb-2">Nilai Inti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="border-4 border-border bg-card p-6 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-none">
              <h3 className="text-2xl font-bold uppercase mb-3">Estetika</h3>
              <p className="font-medium text-muted-foreground">Keindahan dalam kesederhanaan. Kami merayakan warna dan bentuk klasik.</p>
            </div>
            <div className="border-4 border-border bg-secondary text-secondary-foreground p-6 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-none">
              <h3 className="text-2xl font-bold uppercase mb-3">Komunitas</h3>
              <p className="font-medium">Belajar bersama, tumbuh bersama. Kami adalah keluarga besar seniman.</p>
            </div>
            <div className="border-4 border-border bg-destructive text-destructive-foreground p-6 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-none">
              <h3 className="text-2xl font-bold uppercase mb-3">Kualitas</h3>
              <p className="font-medium">Hanya materi terbaik dari instruktur profesional yang berpengalaman di bidangnya.</p>
            </div>
            <div className="border-4 border-border bg-muted p-6 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-none">
              <h3 className="text-2xl font-bold uppercase mb-3">Inovasi</h3>
              <p className="font-medium text-muted-foreground">Membawa teknik klasik ke era digital dengan platform pembelajaran yang interaktif.</p>
            </div>
          </div>
        </section>

        <section className="text-center pt-12">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Siap Memulai Perjalanan Senimu?</h2>
          <Link href="/courses">
            <Button size="lg" className="border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] rounded-none text-xl font-bold px-10 py-8 transition-all">
              Jelajahi Katalog Kelas Sekarang
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
