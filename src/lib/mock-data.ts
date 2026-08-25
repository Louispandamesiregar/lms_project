import { Course } from "@/store/cartStore";

export const MOCK_CATEGORIES = [
  { id: "cat-1", name: "Seni Lukis" },
  { id: "cat-2", name: "Seni Musik" },
  { id: "cat-3", name: "Fotografi" },
  { id: "cat-4", name: "Desain Grafis" },
];

export const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Mastering Vintage Illustration",
    instructor: "Budi Santoso",
    price: 350000,
    thumbnailUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    category: "Seni Lukis",
  },
  {
    id: "course-2",
    title: "Retro Synthwave Production",
    instructor: "Andi Wijaya",
    price: 450000,
    thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    category: "Seni Musik",
  },
  {
    id: "course-3",
    title: "Analog Photography Basics",
    instructor: "Siska Saraswati",
    price: 250000,
    thumbnailUrl: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&q=80",
    category: "Fotografi",
  },
  {
    id: "course-4",
    title: "Brutalist Web Design",
    instructor: "Deni Darmawan",
    price: 300000,
    thumbnailUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    category: "Desain Grafis",
  },
  {
    id: "course-5",
    title: "Pop Art Painting Techniques",
    instructor: "Maya Anggraeni",
    price: 400000,
    thumbnailUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    category: "Seni Lukis",
  },
  {
    id: "course-6",
    title: "Lofi Hip Hop Beatmaking",
    instructor: "Rizky Ramadhan",
    price: 200000,
    thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    category: "Seni Musik",
  },
];
