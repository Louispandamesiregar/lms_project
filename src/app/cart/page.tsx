"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeCourse, clearCart, getTotal } = useCartStore();
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "success">("idle");

  // Hydration fix for Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background p-10 font-bold">Loading Cart...</div>;
  }

  const handleCheckout = () => {
    // Simulasi checkout untuk prototype Langkah 2
    setCheckoutStatus("success");
    clearCart();
  };

  if (checkoutStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-background text-center px-6">
        <div className="bg-primary text-primary-foreground p-12 border-4 border-border shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] max-w-2xl w-full">
          <h2 className="text-4xl font-black uppercase mb-4">Checkout Berhasil! 🎉</h2>
          <p className="text-xl font-medium mb-8">
            Terima kasih telah mendaftar. Untuk saat ini (Prototype Langkah 2), data checkout belum dikirim ke database.
          </p>
          <Link href="/courses">
            <Button size="lg" className="bg-background text-foreground border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] rounded-none text-lg font-bold">
              Kembali ke Katalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <div className="max-w-5xl mx-auto w-full px-6 pt-12">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-8">Keranjang Belanja</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20 border-4 border-dashed border-border bg-muted/30">
            <h3 className="text-2xl font-bold mb-4">Keranjang Anda masih kosong.</h3>
            <Link href="/courses">
              <Button size="lg" className="border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] rounded-none text-lg font-bold transition-all">
                Cari Kelas Seni
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border-4 border-border bg-card shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                  <div className="relative w-32 md:w-48 aspect-video border-2 border-border shrink-0">
                    <Image src={item.thumbnailUrl} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between py-1 flex-1">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold leading-tight uppercase">
                        <Link href={`/courses/${item.id}`} className="hover:underline">{item.title}</Link>
                      </h3>
                      <p className="font-semibold text-muted-foreground mt-1">Oleh {item.instructor}</p>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <span className="text-2xl font-black">Rp {item.price.toLocaleString("id-ID")}</span>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeCourse(item.id)}
                        className="rounded-none border-2 border-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] font-bold uppercase transition-all"
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-96 shrink-0">
              <div className="border-4 border-border shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] bg-primary text-primary-foreground p-8 sticky top-8">
                <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-border pb-4">Ringkasan</h3>
                <div className="flex justify-between text-lg font-bold mb-2">
                  <span>Total Item</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between text-3xl font-black mt-6 border-t-4 border-border pt-6">
                  <span>Total</span>
                  <span>Rp {getTotal().toLocaleString("id-ID")}</span>
                </div>
                <Button 
                  onClick={handleCheckout}
                  size="lg" 
                  className="w-full mt-8 bg-background text-foreground border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] rounded-none text-xl font-black uppercase transition-all"
                >
                  Checkout Sekarang
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
