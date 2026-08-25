import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/CourseCard";
import { db } from "@/db";
import { courses, categories, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function Home() {
  const featuredCourses = await db
    .select({
      id: courses.id,
      title: courses.title,
      price: courses.price,
      thumbnailUrl: courses.thumbnailUrl,
      category: categories.name,
      instructor: users.name,
    })
    .from(courses)
    .leftJoin(categories, eq(courses.categoryId, categories.id))
    .leftJoin(users, eq(courses.instructorId, users.id))
    .orderBy(desc(courses.createdAt))
    .limit(3);

  const categoriesList = ["Seni Musik", "Seni Rupa", "Seni Tari", "Seni Drama", "Seni Sastra"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground border-b-4 border-border px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 max-w-4xl leading-tight">
          Pelajari Seni dengan Gaya <span className="text-background underline decoration-border decoration-8 underline-offset-8">Retro Modern</span>
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-10 max-w-2xl text-primary-foreground/90">
          Dari melukis hingga membuat musik synthwave, temukan kelas seni impianmu dengan instruktur profesional.
        </p>
        <Link href="/courses">
          <Button size="lg" className="bg-background text-foreground border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:bg-background/90 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] transition-all rounded-none text-xl font-bold px-10 py-8">
            Jelajahi Katalog Kelas
          </Button>
        </Link>
      </section>

      {/* Featured Courses */}
      <section className="px-6 py-20 bg-background max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Kelas Unggulan</h2>
            <p className="text-lg text-muted-foreground font-medium">Pilihan terbaik untuk memulai perjalanan senimu.</p>
          </div>
          <Link href="/courses" className="hidden md:block text-primary font-bold hover:underline decoration-2 underline-offset-4">
            Lihat Semua &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={{
                ...course,
                thumbnailUrl: course.thumbnailUrl ?? '',
                category: course.category ?? 'Tanpa Kategori',
                instructor: course.instructor ?? 'Tidak diketahui',
              }} 
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          {categoriesList.map((cat) => (
            <Link key={cat} href={`/courses?category=${encodeURIComponent(cat)}`}>
              <Badge variant="secondary" className="text-lg py-2 px-6 border-2 border-border font-bold hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] rounded-none">
                {cat}
              </Badge>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/courses">
            <Button variant="outline" className="border-2 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] rounded-none font-bold">
              Lihat Semua Kelas
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
