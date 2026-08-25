import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground border-b-4 border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">Dasbor Siswa</h1>
          <p className="text-xl font-medium">Selamat datang kembali, {user.user_metadata?.name || user.email}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 w-full">
        <div className="border-4 border-dashed border-border bg-muted/30 p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Kelas Anda</h2>
          <p className="text-muted-foreground font-medium">
            Belum ada kelas yang dibeli. Jelajahi katalog untuk menemukan kelas favoritmu!
          </p>
        </div>
      </div>
    </div>
  );
}
