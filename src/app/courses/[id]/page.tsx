import CourseDetailClient from "./CourseDetailClient";
import { db } from "@/db";
import { courses, categories, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const courseResult = await db
    .select({
      id: courses.id,
      title: courses.title,
      price: courses.price,
      thumbnailUrl: courses.thumbnailUrl,
      category: categories.name,
      instructor: users.name,
      description: courses.description,
    })
    .from(courses)
    .leftJoin(categories, eq(courses.categoryId, categories.id))
    .leftJoin(users, eq(courses.instructorId, users.id))
    .where(eq(courses.id, resolvedParams.id))
    .limit(1);

  if (courseResult.length === 0) {
    notFound();
  }

  const course = {
    ...courseResult[0],
    thumbnailUrl: courseResult[0].thumbnailUrl ?? '',
    category: courseResult[0].category ?? 'Tanpa Kategori',
    instructor: courseResult[0].instructor ?? 'Tidak diketahui',
  };

  return <CourseDetailClient course={course} />;
}
