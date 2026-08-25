"use server";

import { db } from "@/db";
import { transactions, enrollments, courses } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import { inArray } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function processCheckout(courseIds: string[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login untuk melakukan checkout.");
  }

  if (!courseIds || courseIds.length === 0) {
    throw new Error("Keranjang kosong.");
  }

  // 1. Fetch courses to calculate exact total amount from DB
  const selectedCourses = await db.select().from(courses).where(inArray(courses.id, courseIds));
  
  if (selectedCourses.length !== courseIds.length) {
    throw new Error("Ada kelas yang tidak valid di keranjang Anda.");
  }

  const totalAmount = selectedCourses.reduce((sum, course) => sum + course.price, 0);

  // 2. Create Transaction
  const [newTx] = await db.insert(transactions).values({
    studentId: user.id,
    totalAmount,
    status: 'SUCCESS' // Langsung sukses untuk prototype
  }).returning();

  // 3. Create Enrollments
  const enrollmentsData = selectedCourses.map(course => ({
    studentId: user.id,
    courseId: course.id,
    transactionId: newTx.id,
  }));

  await db.insert(enrollments).values(enrollmentsData);

  return { success: true };
}
