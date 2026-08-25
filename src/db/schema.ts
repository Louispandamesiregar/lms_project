import { pgTable, uuid, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['ADMIN', 'INSTRUCTOR', 'STUDENT']);
export const statusEnum = pgEnum('status', ['PENDING', 'SUCCESS']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // berelasi dengan auth.users Supabase
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: roleEnum('role').default('STUDENT'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
});

export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  instructorId: uuid('instructor_id').references(() => users.id).notNull(),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  price: integer('price').notNull().default(0),
  thumbnailUrl: text('thumbnail_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const lessons = pgTable('lessons', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: uuid('course_id').references(() => courses.id).notNull(),
  title: text('title').notNull(),
  contentUrl: text('content_url'),
  order: integer('order'),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  totalAmount: integer('total_amount').notNull(),
  status: statusEnum('status').default('PENDING'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const enrollments = pgTable('enrollments', {
  id: uuid('id').defaultRandom().primaryKey(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  courseId: uuid('course_id').references(() => courses.id).notNull(),
  transactionId: uuid('transaction_id').references(() => transactions.id).notNull(),
});
