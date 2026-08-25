import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { enrollments, courses, categories, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ambil kelas yang sudah dibeli
  const purchasedCourses = await db
    .select({
      id: courses.id,
      title: courses.title,
      price: courses.price,
      thumbnailUrl: courses.thumbnailUrl,
      category: categories.name,
      instructor: users.name,
    })
    .from(enrollments)
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .leftJoin(categories, eq(courses.categoryId, categories.id))
    .leftJoin(users, eq(courses.instructorId, users.id))
    .where(eq(enrollments.studentId, user.id));

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground border-b-4 border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">Dasbor Siswa</h1>
          <p className="text-xl font-medium">Selamat datang kembali, {user.user_metadata?.name || user.email}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 w-full">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Kelas Anda</h2>
        
        {purchasedCourses.length === 0 ? (
          <div className="border-4 border-dashed border-border bg-muted/30 p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Anda belum membeli kelas.</h3>
            <p className="text-muted-foreground font-medium mb-6">
              Jelajahi katalog untuk menemukan kelas favoritmu!
            </p>
            <Link href="/courses">
              <Button size="lg" className="border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] rounded-none text-lg font-bold transition-all">
                Cari Kelas Seni
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {purchasedCourses.map((course) => (
              <div key={course.id} className="border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] bg-card flex flex-col h-full rounded-none overflow-hidden transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
                <div className="relative w-full h-48 border-b-4 border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.thumbnailUrl || ""}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] rounded-none font-bold px-3 py-1 text-xs">
                      {course.category || 'Tanpa Kategori'}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold leading-tight mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                    Oleh {course.instructor || 'Tidak diketahui'}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t-4 border-border border-dashed">
                    <Link href={`/learn/${course.id}`}>
                      <Button className="w-full rounded-none border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] font-bold text-md hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        Mulai Belajar
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
