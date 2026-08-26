"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { logout } from "@/app/login/actions";
import type { User } from "@supabase/supabase-js";

export function Navbar({ user }: { user: User | null }) {
  const [mounted, setMounted] = useState(false);
  const { items } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b-4 border-border bg-background px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image src="/logo_artretro.png" alt="ArtRetro LMS Logo" width={150} height={40} className="h-10 w-auto" priority />
        </Link>
        <div className="hidden md:flex gap-4">
          <Link href="/courses" className="text-sm font-medium hover:underline underline-offset-4 decoration-2">
            Katalog Kelas
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4 decoration-2">
            Tentang Kami
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link 
          href="/cart"
          className={cn(buttonVariants({ variant: "outline" }), "border-2 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all")}
        >
          Keranjang {mounted && items.length > 0 && `(${items.length})`}
        </Link>
        {user ? (
          <>
            <Link 
              href="/dashboard"
              className={cn(buttonVariants(), "border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all")}
            >
              Dasbor
            </Link>
            <form action={logout}>
              <Button type="submit" variant="destructive" className="border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all">
                Keluar
              </Button>
            </form>
          </>
        ) : (
          <Link 
            href="/login"
            className={cn(buttonVariants(), "border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all")}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
