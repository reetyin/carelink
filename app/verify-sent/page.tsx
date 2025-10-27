"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifySentPage() {
  const sp = useSearchParams();
  const email = sp.get('email');
  const token = sp.get('token');
  const verifyUrl = token ? `/verify?token=${encodeURIComponent(token)}` : "/verify";
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 rounded bg-background">
        <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
        <p className="text-muted-foreground mb-4">We sent a verification link to {email || 'your email'}.</p>
        <p className="mb-6">Click the link in the email to verify. For demo, you can also click below:</p>
        <Link href={verifyUrl} className="text-primary underline">Complete verification</Link>
      </div>
    </div>
  );
}
