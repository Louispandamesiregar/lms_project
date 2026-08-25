import Link from "next/link";
import { Button } from "@/components/ui/button";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background px-6">
      <div className="w-full max-w-md bg-card border-4 border-border shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-8">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2 text-center">Masuk</h1>
        <p className="text-muted-foreground font-medium text-center mb-8">
          Selamat datang kembali di ArtRetro LMS
        </p>

        {error && (
          <div className="bg-destructive/10 text-destructive border-2 border-destructive p-4 font-bold mb-6">
            Error: {message}
          </div>
        )}

        <form className="space-y-6" action={login}>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              name="email"
              required 
              className="w-full border-4 border-border p-3 font-medium bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
              placeholder="nama@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              name="password"
              required 
              className="w-full border-4 border-border p-3 font-medium bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full text-lg font-black uppercase rounded-none border-4 border-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] transition-all py-6">
            Masuk
          </Button>
        </form>

        <div className="mt-8 text-center font-medium">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-primary hover:underline decoration-2 underline-offset-4">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
