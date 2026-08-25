import { db } from "@/db";
import { courses, lessons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function LearnPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const courseData = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  if (!courseData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-black mb-4">Kelas tidak ditemukan</h1>
        <Link href="/dashboard">
          <Button>Kembali ke Dasbor</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground border-b-4 border-border py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-black uppercase tracking-tight truncate max-w-2xl">
          {courseData.title}
        </h1>
        <Link href="/dashboard">
          <Button variant="outline" className="border-2 border-border font-bold shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] rounded-none text-foreground bg-background hover:bg-background/90 transition-all">
            Keluar Kelas
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Main Content Area (Video Player Placeholder) */}
        <div className="flex-1 border-r-4 lg:border-border p-6 flex flex-col">
          <div className="w-full aspect-video bg-card border-4 border-border shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center relative overflow-hidden mb-8">
            <div className="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 bg-primary border-4 border-border rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] transition-all">
                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-primary-foreground border-b-[15px] border-b-transparent ml-2" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-wider mb-2">Materi 1: Pendahuluan</h2>
              <p className="font-medium text-muted-foreground text-lg">Klik putar untuk memulai video pembelajaran</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold uppercase mb-4 border-b-4 border-border pb-2 inline-block">Deskripsi Materi</h3>
            <p className="font-medium">
              Ini adalah tampilan pemutar materi pembelajaran. Di sini siswa dapat menonton video, membaca dokumen referensi, dan mengunduh berkas (*file*) pendukung yang diunggah oleh instruktur ke Supabase Storage.
            </p>
          </div>
        </div>

        {/* Sidebar Syllabus */}
        <div className="w-full lg:w-96 bg-muted/30 p-6 flex flex-col h-full border-t-4 lg:border-t-0 border-border">
          <h3 className="text-2xl font-black uppercase tracking-wider mb-6">Silabus Kelas</h3>
          
          <div className="space-y-4">
            <div className="border-4 border-border bg-primary text-primary-foreground p-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] font-bold cursor-pointer transition-all">
              1. Pendahuluan
            </div>
            <div className="border-4 border-border bg-card p-4 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] font-bold cursor-pointer transition-all hover:border-primary">
              2. Teknik Dasar
            </div>
            <div className="border-4 border-border bg-card p-4 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] font-bold cursor-pointer transition-all hover:border-primary">
              3. Praktik Pertama
            </div>
            <div className="border-4 border-border bg-card p-4 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] font-bold cursor-pointer transition-all hover:border-primary">
              4. Proyek Akhir
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
