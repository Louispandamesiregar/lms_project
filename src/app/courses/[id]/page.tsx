import { MOCK_COURSES } from "@/lib/mock-data";
import CourseDetailClient from "./CourseDetailClient";

export function generateStaticParams() {
  return MOCK_COURSES.map((course) => ({
    id: course.id,
  }));
}

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <CourseDetailClient params={params} />;
}
