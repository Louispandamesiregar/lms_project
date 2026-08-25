import { MOCK_COURSES, MOCK_CATEGORIES } from "@/lib/mock-data";
import { CourseCard } from "@/components/CourseCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-destructive text-destructive-foreground border-b-4 border-border py-12 px-6">
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
              <Badge variant="outline" className="border-2 border-border font-bold bg-primary text-primary-foreground rounded-none shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                Semua Kategori
              </Badge>
              {MOCK_CATEGORIES.map((cat) => (
                <Badge key={cat.id} variant="outline" className="border-2 border-border font-bold hover:bg-muted rounded-none cursor-pointer">
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {MOCK_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
