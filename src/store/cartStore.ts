import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  thumbnailUrl: string;
  category: string;
}

interface CartState {
  items: Course[];
  addCourse: (course: Course) => void;
  removeCourse: (courseId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addCourse: (course) => {
        const { items } = get();
        if (!items.find((item) => item.id === course.id)) {
          set({ items: [...items, course] });
        }
      },
      removeCourse: (courseId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== courseId),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      },
    }),
    {
      name: 'artretro-cart-storage',
    }
  )
);
