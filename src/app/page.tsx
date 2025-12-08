import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Welcome to Next.js + Supabase</h1>
        <Link href="/login">
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
