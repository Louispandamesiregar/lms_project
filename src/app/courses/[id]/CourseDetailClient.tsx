"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_COURSES } from "@/lib/mock-data";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CourseDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const course = MOCK_COURSES.find((c) => c.id === resolvedParams.id);
  
  if (!course) {
    notFound();
  }

  const { addCourse, items } = useCartStore();
  const isInCart = items.some((item) => item.id === course.id);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Back button */}
      <div className="max-w-7xl mx-auto w-full px-6 py-6">
        <Link href="/courses" className="font-bold hover:underline decoration-2 underline-offset-4">
          &larr; Kembali ke Katalog
        </Link>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row gap-10">
        {/* Course Info */}
        <div className="flex-1 space-y-6">
          <Badge className="bg-secondary text-secondary-foreground border-2 border-border rounded-none shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] font-bold text-lg px-4 py-1">
            {course.category}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none">
            {course.title}
          </h1>
          <p className="text-xl font-medium text-muted-foreground">
            Instruktur: <span className="font-bold text-foreground">{course.instructor}</span>
          </p>

          <div className="prose prose-lg pt-6 border-t-4 border-border">
            <h3 className="text-2xl font-bold uppercase">Tentang Kelas Ini</h3>
            <p className="font-medium">
              Pelajari teknik-teknik terbaik langsung dari ahlinya. Kelas ini dirancang khusus untuk membawa kemampuan seni Anda ke level berikutnya dengan gaya retro yang unik dan menarik.
              Dalam kelas <strong>{course.title}</strong>, Anda akan dibimbing *step-by-step* mulai dari dasar hingga tingkat lanjut.
            </p>
          </div>
        </div>

        {/* Action Card */}
        <div className="w-full md:w-[400px] shrink-0">
          <div className="border-4 border-border shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] bg-card sticky top-8">
            <div className="relative w-full aspect-video border-b-4 border-border">
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 space-y-6">
              <p className="text-4xl font-black">
                Rp {course.price.toLocaleString("id-ID")}
              </p>
              
              <Button
                onClick={() => addCourse(course)}
                disabled={isInCart}
                size="lg"
                className="w-full rounded-none border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] font-black text-xl py-8 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInCart ? "Sudah di Keranjang" : "Tambah ke Keranjang"}
              </Button>
              
              <div className="text-sm font-bold text-center text-muted-foreground uppercase">
                Akses Seumur Hidup &bull; Sertifikat Digital
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
