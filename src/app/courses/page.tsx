import { CourseCard } from "@/components/CourseCard";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { courses, categories, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const activeCategory = params.category;

  let query = db
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
    .leftJoin(users, eq(courses.instructorId, users.id));

  if (activeCategory) {
    query = query.where(eq(categories.name, activeCategory)) as any;
  }

  const allCourses = await query.orderBy(desc(courses.createdAt));

  const allCategories = await db.select().from(categories).orderBy(categories.name);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Header */}
      <div className="bg-destructive text-destructive-foreground border-b-4 border-border py-12 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative">
          <div className="flex-1 z-10">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Katalog Kelas</h1>
            <p className="text-xl font-medium max-w-2xl">
              Temukan kelas seni yang sesuai dengan minatmu dan pelajari teknik baru dari ahlinya.
            </p>
          </div>

          {/* Decorative Retro Stickers - Aligned in a row, overlapping and shifted right */}
          <div className="hidden lg:flex items-center -space-x-16 xl:-space-x-20 z-20 pointer-events-none translate-x-12 lg:translate-x-24 xl:translate-x-32">
            <img src="/images/desain grafis.png" alt="" className="w-48 h-48 xl:w-60 xl:h-60 object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] relative z-10" />
            <img src="/images/fotografi.png" alt="" className="w-48 h-48 xl:w-60 xl:h-60 object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] relative z-20" />
            <img src="/images/seni lukis.png" alt="" className="w-48 h-48 xl:w-60 xl:h-60 object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] relative z-30" />
            <img src="/images/seni musik beatmaking.png" alt="" className="w-48 h-48 xl:w-60 xl:h-60 object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] relative z-40" />
            <img src="/images/seni musik.png" alt="" className="w-48 h-48 xl:w-60 xl:h-60 object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] relative z-50" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 w-full flex flex-col md:flex-row gap-8">
        {/* Sidebar / Filters (Static Mock) */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider border-b-2 border-border pb-2">Kategori</h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/courses">
                <Badge variant="outline" className={`border-2 border-border font-bold rounded-none cursor-pointer ${!activeCategory ? 'bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]' : 'hover:bg-muted'}`}>
                  Semua Kategori
                </Badge>
              </Link>
              {allCategories.map((cat) => (
                <Link key={cat.id} href={`/courses?category=${encodeURIComponent(cat.name)}`}>
                  <Badge variant="outline" className={`border-2 border-border font-bold rounded-none cursor-pointer ${activeCategory === cat.name ? 'bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]' : 'hover:bg-muted'}`}>
                    {cat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {allCourses.map((course) => (
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
        </div>
      </div>
    </div>
  );
}
