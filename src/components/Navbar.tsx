"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
        <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          ArtRetro<span className="text-primary">LMS</span>
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
        <Link href="/cart">
          <Button variant="outline" className="border-2 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all">
            Keranjang {mounted && items.length > 0 && `(${items.length})`}
          </Button>
        </Link>
        {user ? (
          <>
            <Link href="/dashboard">
              <Button className="border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all">
                Dasbor
              </Button>
            </Link>
            <form action={logout}>
              <Button variant="destructive" className="border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all">
                Keluar
              </Button>
            </form>
          </>
        ) : (
          <Link href="/login">
            <Button className="border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] transition-all">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
