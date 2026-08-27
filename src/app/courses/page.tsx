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
      {/* Decorative Retro Stickers (Hidden on small screens to avoid clutter) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
        <img src="/images/desain grafis.png" alt="" className="absolute top-10 right-10 -rotate-12 w-32 h-32 object-contain drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] animate-bounce" style={{ animationDuration: '4s' }} />
        <img src="/images/fotografi.png" alt="" className="absolute bottom-40 left-5 rotate-6 w-40 h-40 object-contain drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] animate-pulse" style={{ animationDuration: '3s' }} />
        <img src="/images/seni lukis.png" alt="" className="absolute top-1/2 -right-5 rotate-12 w-48 h-48 object-contain drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] animate-bounce" style={{ animationDuration: '5s' }} />
        <img src="/images/seni musik beatmaking.png" alt="" className="absolute top-52 -left-10 -rotate-12 w-36 h-36 object-contain drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] animate-pulse" style={{ animationDuration: '4.5s' }} />
        <img src="/images/seni musik.png" alt="" className="absolute bottom-10 right-20 -rotate-6 w-32 h-32 object-contain drop-shadow-[4px_4px_0px_rgba(26,26,26,1)] animate-bounce" style={{ animationDuration: '3.5s' }} />
      </div>

      {/* Header */}
      <div className="bg-destructive text-destructive-foreground border-b-4 border-border py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Katalog Kelas</h1>
          <p className="text-xl font-medium max-w-2xl">
            Temukan kelas seni yang sesuai dengan minatmu dan pelajari teknik baru dari ahlinya.
          </p>
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
