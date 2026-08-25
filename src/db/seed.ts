import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from './index';
import { users, categories, courses } from './schema';
import { MOCK_COURSES, MOCK_CATEGORIES } from '../lib/mock-data';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Seeding started...');
  
  try {
    // 1. Create a dummy instructor user if not exists
    const instructorEmail = 'budi@artretro.com';
    let instructor = await db.select().from(users).where(eq(users.email, instructorEmail)).limit(1);
    
    if (instructor.length === 0) {
      console.log('Creating dummy instructor...');
      instructor = await db.insert(users).values({
        id: '00000000-0000-0000-0000-000000000001', // mock UUID
        name: 'Budi Santoso',
        email: instructorEmail,
        role: 'INSTRUCTOR'
      }).returning();
    }

    const instructorId = instructor[0].id;

    // 2. Insert Categories
    console.log('Seeding categories...');
    const insertedCategories = [];
    for (const cat of MOCK_CATEGORIES) {
      let existingCat = await db.select().from(categories).where(eq(categories.name, cat.name)).limit(1);
      if (existingCat.length === 0) {
         existingCat = await db.insert(categories).values({
           name: cat.name
         }).returning();
      }
      insertedCategories.push(existingCat[0]);
    }

    // 3. Insert Courses
    console.log('Seeding courses...');
    for (const course of MOCK_COURSES) {
      // find category id
      const catId = insertedCategories.find(c => c.name === course.category)?.id;
      if (!catId) continue;

      let existingCourse = await db.select().from(courses).where(eq(courses.title, course.title)).limit(1);
      if (existingCourse.length === 0) {
        await db.insert(courses).values({
          instructorId: instructorId,
          categoryId: catId,
          title: course.title,
          description: "Pelajari teknik-teknik terbaik langsung dari ahlinya. Kelas ini dirancang khusus untuk membawa kemampuan seni Anda ke level berikutnya dengan gaya retro yang unik dan menarik.",
          price: course.price,
          thumbnailUrl: course.thumbnailUrl
        });
      }
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
