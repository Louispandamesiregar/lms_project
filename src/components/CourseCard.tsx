"use client";

import Link from "next/link";
import Image from "next/image";
import { Course, useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CourseCard({ course }: { course: Course }) {
  const { addCourse, items } = useCartStore();
  const isInCart = items.some((item) => item.id === course.id);

  return (
    <Card className="flex flex-col h-full border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] transition-all bg-card overflow-hidden rounded-none">
      <div className="relative w-full h-48 border-b-4 border-border">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-primary-foreground border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] rounded-none font-bold">
            {course.category}
          </Badge>
        </div>
      </div>
      <CardHeader className="flex-1 p-6">
        <CardTitle className="text-xl font-bold leading-tight">
          <Link href={`/courses/${course.id}`} className="hover:underline decoration-2 underline-offset-4">
            {course.title}
          </Link>
        </CardTitle>
        <p className="text-sm font-semibold text-muted-foreground mt-2 uppercase tracking-wider">
          Oleh {course.instructor}
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-2xl font-black">
          Rp {course.price.toLocaleString("id-ID")}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto border-t-4 border-border bg-muted/50 p-6 flex flex-col gap-3">
        <Button
          onClick={() => addCourse(course)}
          disabled={isInCart}
          className="w-full rounded-none border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] font-bold text-md hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isInCart ? "Sudah di Keranjang" : "Tambah ke Keranjang"}
        </Button>
        <Link href={`/courses/${course.id}`} className="w-full">
          <Button variant="outline" className="w-full rounded-none border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] font-bold text-md hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all">
            Lihat Detail
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
